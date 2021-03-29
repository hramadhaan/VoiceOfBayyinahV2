import {BANNER_ERROR, BANNER_FETCH, BANNER_START} from '../actions/banner';

const initialState = {
  banners: [],
  loading: false,
  error: null,
  message: null,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BANNER_START:
      return {
        ...state,
        loading: true,
      };
    case BANNER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case BANNER_FETCH:
      return {
        banners: action.banner,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
