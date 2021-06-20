import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import moment from 'moment';
import 'moment/locale/id';
import Comment from '../../models/Comment';
moment().locale('id');

export const COMMENT_START = 'COMMENT_START';
export const COMMENT_ERROR = 'COMMENT_ERROR';
export const COMMENT_FETCH = 'COMMENT_FETCH';
export const COMMENT_DETAIL = 'COMMENT_DETAIL';
export const COMMENT_POST = 'COMMENT_POST';
export const COMMENT_LIKE = 'COMMENT_LIKE';
export const COMMENT_UNLIKE = 'COMMENT_UNLIKE';
export const COMMENT_LIKE_FETCH = 'COMMENT_LIKE_FETCH';

export const COMMENT_DELETE = "COMMENT_DELETE"

export const SUB_COMMENT_FETCH = 'SUB_COMMENT_FETCH';
export const SUB_COMMENT_POST = 'SUB_COMMENT_POST';
export const SUB_COMMENT_DELETE = "SUB_COMMENT_DELETE"


export const fetchComment = (idArtikel) => {
  return async (dispatch) => {
    dispatch({
      type: COMMENT_START,
    });

    database()
      .ref('Comment')
      .child(idArtikel)
      .orderByChild('date')
      .once('value')
      .then((snapshot) => {
        const loadedComments = [];

        snapshot.forEach((datasnapshot) => {
          const data = datasnapshot.val();
          loadedComments.push(
            new Comment(
              datasnapshot.key,
              data.user.image,
              data.user.name,
              data.comment,
              data.user.uid,
              data.time,
            ),
          );
        });

        dispatch({
          type: COMMENT_FETCH,
          payload: loadedComments,
        });
      })
      .catch((err) =>
        dispatch({
          type: COMMENT_ERROR,
          error: err,
        }),
      );
  };
};

export const postComment = (idArtikel, commentMessage) => {
  return async (dispatch) => {
    const user = await AsyncStorage.getItem('userData');
    const userJSON = JSON.parse(user);

    const timeStamp = moment().format('LLL');

    const refPost = database().ref('Comment').child(idArtikel).push();

    refPost
      .set({
        user: userJSON,
        comment: commentMessage,
        time: timeStamp,
      })
      .then(() => {
        dispatch({
          type: COMMENT_POST,
          payload: {
            id: refPost.key,
            uid: userJSON.uid,
            image: userJSON.image,
            name: userJSON.name,
            comment: commentMessage,
            time: timeStamp,
          },
        });
      })
      .catch((err) =>
        dispatch({
          type: COMMENT_ERROR,
          error: err,
        }),
      );
  };
};

export const postSubComment = (idComment, commentMessage) => {
  return async (dispatch) => {
    // dispatch({
    //   type: COMMENT_START,
    // });

    const user = await AsyncStorage.getItem('userData');
    const userJSON = JSON.parse(user);

    const timeStamp = moment().format('LLL');

    const refSubPost = database().ref('SubComment').child(idComment).push();

    refSubPost
      .set({
        user: userJSON,
        comment: commentMessage,
        time: timeStamp,
      })
      .then(() => {
        dispatch({
          type: SUB_COMMENT_POST,
          payload: {
            id: refSubPost.key,
            uid: userJSON.uid,
            image: userJSON.image,
            name: userJSON.name,
            comment: commentMessage,
            time: timeStamp,
          },
        });
      })
      .catch((err) =>
        dispatch({
          type: COMMENT_ERROR,
          error: err,
        }),
      );
  };
};

export const fetchSubComment = (idComment) => {
  return async (dispatch) => {
    dispatch({
      type: COMMENT_START,
    });

    database()
      .ref('SubComment')
      .child(idComment)
      .orderByChild('date')
      .once('value')
      .then((snapshot) => {
        const loadedComments = [];

        snapshot.forEach((datasnapshot) => {
          const data = datasnapshot.val();
          loadedComments.push(
            new Comment(
              datasnapshot.key,
              data.user.image,
              data.user.name,
              data.comment,
              data.user.uid,
              data.time,
            ),
          );
        });

        dispatch({
          type: SUB_COMMENT_FETCH,
          payload: loadedComments,
        });
      })
      .catch((err) =>
        dispatch({
          type: COMMENT_ERROR,
          error: err,
        }),
      );
  };
};

export const likeComment = (idComment) => {
  return async (dispatch) => {
    const user = await AsyncStorage.getItem('userData');
    const userJSON = JSON.parse(user);

    database()
      .ref('LikeComment')
      .child(idComment)
      .child(userJSON.uid)
      .set(userJSON)
      .then(() => {
        dispatch({
          type: COMMENT_LIKE,
          payload: userJSON,
        });
      })
      .catch((err) =>
        dispatch({
          type: COMMENT_ERROR,
          error: err,
        }),
      );
  };
};

export const unlikeComment = (idComment) => {
  return async (dispatch, getState) => {
    database()
      .ref('LikeComment')
      .child(idComment)
      .child(getState().user.uid)
      .remove()
      .then(() => {
        dispatch({
          type: COMMENT_UNLIKE,
          id: idComment,
        });
      })
      .catch((err) =>
        dispatch({
          type: COMMENT_ERROR,
          error: err,
        }),
      );
  };
};

export const deleteComment = (idArtikel, idComment) => {
  return async dispatch => {
    database().ref('Comment').child(idArtikel).child(idComment).remove().then(() => {
      database().ref('SubComment').child(idComment).remove()
      dispatch({
        type: COMMENT_DELETE,
        id: idComment
      })
    }).catch(err => dispatch({
      type: COMMENT_ERROR,
      error: err
    }))
  }
}

export const deleteSubComment = (parentId, idComment) => {
  return async dispatch => {
    database().ref('SubComment').child(parentId).child(idComment).remove().then(() => {
      dispatch({
        type: SUB_COMMENT_DELETE,
        id: idComment
      })
    }).catch(err => dispatch({
      type: COMMENT_ERROR,
      error: err
    }))
  }
}