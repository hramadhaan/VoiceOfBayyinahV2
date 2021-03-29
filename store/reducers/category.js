import {
  CATEGORY_FETCH,
  CATEGORY_ERROR,
  CATEGORY_START,
} from '../actions/category';

const initialState = {
  categories: [],
  loading: false,
  error: null,
  message: null,
  success: false,
  progress: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_START:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CATEGORY_FETCH:
      return {
        categories: action.category,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
