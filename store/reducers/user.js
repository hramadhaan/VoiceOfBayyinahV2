import {USER_ERROR, USER_START, USER_FETCH} from '../actions/user';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_START:
      return {
        ...state,
        loading: true,
      };
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case USER_FETCH:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
