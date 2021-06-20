import {AUTHENTICATION, LOGOUT, SET_DID_TRY_AL} from '../actions/auth';

const initialState = {
  uid: null,
  email: null,
  name: null,
  image: null,
  typeUser: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION:
      return {
        uid: action.uid,
        email: action.email,
        name: action.name,
        image: action.image,
        typeUser: action.typeUser,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
