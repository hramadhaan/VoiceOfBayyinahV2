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
        const categories = result.val();
        const loadedCategory = [];

        for (const key in categories) {
          loadedCategory.push(
            new Category(key, categories[key].name, categories[key].image),
          );
        }

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
