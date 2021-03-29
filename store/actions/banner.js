import database from '@react-native-firebase/database';
import Banner from '../../models/Banner';

export const BANNER_START = 'BANNER_START';
export const BANNER_ERROR = 'BANNER_ERROR';
export const BANNER_FETCH = 'BANNER_FETCH';

export const fetchBanner = () => {
  return async (dispatch) => {
    dispatch({
      type: BANNER_START,
    });

    database()
      .ref('Banner')
      .once('value')
      .then((result) => {
        const banners = result.val();
        const loadedBanner = [];

        for (const key in banners) {
          loadedBanner.push(new Banner(key, banners[key].image));
        }

        dispatch({
          type: BANNER_FETCH,
          banner: loadedBanner,
        });
      })
      .catch((err) =>
        dispatch({
          type: BANNER_ERROR,
          error: err,
        }),
      );
  };
};
