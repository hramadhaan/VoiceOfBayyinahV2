import database from '@react-native-firebase/database';
import Category from '../../models/Category';

export const CATEGORY_START = 'CATEGORY_START';
export const CATEGORY_ERROR = 'CATEGORY_ERROR';
export const CATEGORY_FETCH = 'CATEGORY_FETCH';

export const fetchCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: CATEGORY_START,
    });
    database()
      .ref('Category')
      .once('value')
      .then((result) => {
        const loadedCategory = []

        result.forEach((snapshot, index) => {
          const key = snapshot.key
          const data = snapshot.val()

          loadedCategory.push(new Category(key, data.name, data.image))
        })

        dispatch({
          type: CATEGORY_FETCH,
          category: loadedCategory.reverse(),
        });
      })
      .catch((err) => {
        dispatch({
          type: CATEGORY_ERROR,
          error: err,
        });
      });
  };
};
