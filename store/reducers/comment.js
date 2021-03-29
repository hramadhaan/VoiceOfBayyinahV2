import Comment from '../../models/Comment';
import {
  COMMENT_POST,
  COMMENT_ERROR,
  COMMENT_START,
  COMMENT_DETAIL,
  COMMENT_FETCH,
  //
  SUB_COMMENT_FETCH,
  SUB_COMMENT_POST,
} from '../actions/comment';

const initialState = {
  loading: false,
  error: null,
  comments: [],
  subComments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_START:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case COMMENT_POST:
      const comment = new Comment(
        action.payload.id,
        action.payload.image,
        action.payload.name,
        action.payload.comment,
        action.payload.time,
      );
      return {
        ...state,
        loading: false,
        error: null,
        comments: state.comments.concat(comment),
      };
    case SUB_COMMENT_POST:
      const subComment = new Comment(
        action.payload.id,
        action.payload.image,
        action.payload.name,
        action.payload.comment,
        action.payload.time,
      );
      return {
        ...state,
        loading: false,
        error: null,
        subComments: state.subComments.concat(subComment),
      };
    case COMMENT_FETCH:
      return {
        loading: false,
        error: null,
        comments: action.payload,
      };
    case SUB_COMMENT_FETCH:
      return {
        ...state,
        loading: false,
        error: null,
        subComments: action.payload,
      };
    default:
      return state;
  }
};
