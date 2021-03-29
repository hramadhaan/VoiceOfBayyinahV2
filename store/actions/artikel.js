import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import Article from '../../models/Article';
import Users from '../../models/User';

export const ARTIKEL_START = 'ARTIKEL_START';
export const ARTIKEL_ERROR = 'ARTIKEL_ERROR';
export const ARTIKEL_FETCH = 'ARTIKEL_FETCH';
export const ARTIKEL_SORT_POPULAR = 'ARTIKEL_SORT_POPULAR';
export const ARTIKEL_INCREASE_VIEW = 'ARTIKEL_INCREASE_VIEW';
export const ARTIKEL_DETAIL = 'ARTIKEL_DETAIL';
// LIKE ARTIKEL
export const ARTIKEL_ISLIKE = 'ARTIKEL_ISLIKE';
export const ARTIKEL_ISUNLIKE = 'ARTIKEL_ISUNLIKE';
export const ARTIKEL_FETCH_LIKE = 'ARTIKEL_FETCH_LIKE';
// BOOKMARK ARTIKEL
export const ARTIKEL_ISBOOKMARK = 'ARITKEL_ISBOOKMARK';
export const ARTIKEL_ISUNBOOKMARK = 'ARTIKEL_ISUNBOOKMARK';
export const ARTIKEL_FETCH_BOOKMARK = 'ARTIKEL_FETCH_BOOKMARK';

export const artikelSortPopular = () => {
  return async (dispatch) => {
    dispatch({
      type: ARTIKEL_START,
    });
    database()
      .ref('Article/')
      .orderByChild('countView')
      .limitToLast(5)
      .once('value')
      .then((snapshot) => {
        const loadedArticle = [];
        snapshot.forEach((childSnapshot, index) => {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          loadedArticle.push(
            new Article(
              key,
              childData.imageUrl,
              childData.judul,
              childData.hashtag,
              childData.idCategory,
              childData.partOne,
              childData.partTwo,
              childData.partThree,
              childData.time,
              childData.idPenulis,
              childData.countView,
            ),
          );
        });
        dispatch({
          type: ARTIKEL_SORT_POPULAR,
          payload: loadedArticle.reverse(),
        });
      })
      .catch((err) => {
        dispatch({
          type: ARTIKEL_ERROR,
          error: err,
        });
      });
  };
};

export const increaseViewArtikel = (id) => {
  return async (dispatch) => {
    dispatch({
      type: ARTIKEL_START,
    });

    database()
      .ref('Article')
      .child(id)
      .once('value')
      .then((result) => {
        const artikel = result.val();
        const currentView = artikel.countView;

        const count = currentView + 1;
        database()
          .ref('Article')
          .child(id)
          .update({
            countView: count,
          })
          .then(() => {
            dispatch({
              type: ARTIKEL_INCREASE_VIEW,
              id: id,
              payload: {
                countView: count,
              },
            });
          })
          .catch((err) =>
            dispatch({
              type: ARTIKEL_ERROR,
              error: err,
            }),
          );
      })
      .catch((err) =>
        dispatch({
          type: ARTIKEL_ERROR,
          error: err,
        }),
      );

    // const count = currentView + 1;
  };
};

export const artikelDetail = (id) => {
  return async (dispatch) => {
    dispatch({
      type: ARTIKEL_START,
    });
    database()
      .ref('Article')
      .child(id)
      .once('value')
      .then((result) => {
        const data = result.val();
        const detailArtikel = new Article(
          result.key,
          data.imageUrl,
          data.judul,
          data.hashtag,
          data.idCategory,
          data.partOne,
          data.partTwo,
          data.partThree,
          data.time,
          data.idPenulis,
          data.countView,
        );
        dispatch({
          type: ARTIKEL_DETAIL,
          payload: detailArtikel,
        });
      })
      .catch((err) =>
        dispatch({
          type: ARTIKEL_ERROR,
          error: err,
        }),
      );
  };
};

export const likeArtikel = (idArtikel) => {
  return async (dispatch) => {
    // dispatch({
    //   type: ARTIKEL_START,
    // });

    const user = await AsyncStorage.getItem('userData');
    const userJSON = JSON.parse(user);

    database()
      .ref('Like')
      .child(idArtikel)
      .child(userJSON.uid)
      .set(userJSON)
      .then((snapshot) => {
        dispatch({
          type: ARTIKEL_ISLIKE,
          payload: userJSON,
        });
      })
      .catch((err) =>
        dispatch({
          type: ARTIKEL_ERROR,
          error: err,
        }),
      );
  };
};

export const bookmarkArtikel = (artikel) => {
  return async (dispatch, getState) => {
    const refBookmark = database()
      .ref('Bookmark')
      .child(getState().auth.uid)
      .child(artikel.id);

    refBookmark
      .set(artikel)
      .then(() => {
        dispatch({
          type: ARTIKEL_ISBOOKMARK,
          payload: {
            id: refBookmark.key,
            imageUrl: artikel.imageUrl,
            judul: artikel.judul,
            hashtag: artikel.hashtag,
            idCategory: artikel.idCategory,
            partOne: artikel.partOne,
            partTwo: artikel.partTwo,
            partThree: artikel.partThree,
            time: artikel.time,
            idPenulis: artikel.idPenulis,
            countView: artikel.countView,
          },
        });
      })
      .catch((err) =>
        dispatch({
          type: ARTIKEL_ERROR,
          error: err,
        }),
      );
  };
};

export const unlikeArtikel = (idArtikel) => {
  return async (dispatch) => {
    // dispatch({
    //   type: ARTIKEL_START,
    // });

    const user = await AsyncStorage.getItem('userData');
    const userJSON = JSON.parse(user);

    database()
      .ref('Like')
      .child(idArtikel)
      .child(userJSON.uid)
      .remove()
      .then((snapshot) => {
        dispatch({
          type: ARTIKEL_ISUNLIKE,
          id: userJSON.uid,
        });
      })
      .catch((err) =>
        dispatch({
          type: ARTIKEL_ERROR,
          error: err,
        }),
      );
  };
};

export const unBookmarkArtikel = (idBookmark) => {
  return async (dispatch, getState) => {
    database()
      .ref('Bookmark')
      .child(getState().auth.uid)
      .child(idBookmark)
      .remove(() => {
        dispatch({
          type: ARTIKEL_ISUNBOOKMARK,
          id: idBookmark,
        });
      })
      .catch((err) =>
        dispatch({
          type: ARTIKEL_ERROR,
          error: err,
        }),
      );
  };
};

export const fetchLikeArtikel = (idArtikel) => {
  return async (dispatch) => {
    dispatch({
      type: ARTIKEL_START,
    });

    database()
      .ref('Like')
      .child(idArtikel)
      .once('value')
      .then((snapshot) => {
        const loadedUser = [];
        const users = snapshot.val();

        for (const key in users) {
          loadedUser.push(
            new Users(
              key,
              users[key].name,
              users[key].image,
              users[key].email,
              users[key].typeUser,
            ),
          );
        }

        dispatch({
          type: ARTIKEL_FETCH_LIKE,
          payload: loadedUser,
        });
      })
      .catch((err) => dispatch({type: ARTIKEL_ERROR, error: err}));
  };
};

export const fetchBookmark = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: ARTIKEL_START,
    });

    database()
      .ref('Bookmark')
      .child(getState().auth.uid)
      .orderByChild('time')
      .once('value')
      .then((snapshot) => {
        const loadedSnapshot = [];

        snapshot.forEach((dataSnapshot) => {
          const data = dataSnapshot.val();
          loadedSnapshot.push(
            new Article(
              dataSnapshot.key,
              data.imageUrl,
              data.judul,
              data.hashtag,
              data.idCategory,
              data.partOne,
              data.partTwo,
              data.partThree,
              data.time,
              data.idPenulis,
              data.countView,
            ),
          );
        });

        dispatch({
          type: ARTIKEL_FETCH_BOOKMARK,
          payload: loadedSnapshot,
        });
      })
      .catch((err) =>
        dispatch({
          type: ARTIKEL_ERROR,
          error: err,
        }),
      );
  };
};
