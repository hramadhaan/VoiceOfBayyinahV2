import Article from '../../models/Article';
import Users from '../../models/User';
import {
  ARTIKEL_ERROR,
  ARTIKEL_FETCH,
  ARTIKEL_SORT_POPULAR,
  ARTIKEL_START,
  ARTIKEL_INCREASE_VIEW,
  ARTIKEL_DETAIL,
  ARTIKEL_FETCH_LIKE,
  ARTIKEL_ISLIKE,
  ARTIKEL_ISUNLIKE,
  ARTIKEL_ISBOOKMARK,
  ARTIKEL_FETCH_BOOKMARK,
  ARTIKEL_ISUNBOOKMARK,
} from '../actions/artikel';

const initialState = {
  artikels: [],
  sortArtikels: [],
  likeArtikel: [],
  artikelData: {},
  bookmarkArtikel: [],
  loading: false,
  error: null,
  messages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ARTIKEL_START:
      return {
        ...state,
        loading: true,
        messages: null,
      };
    case ARTIKEL_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ARTIKEL_SORT_POPULAR:
      return {
        ...state,
        sortArtikels: action.payload,
        loading: false,
      };
    case ARTIKEL_INCREASE_VIEW:
      const artikelIndex = state.sortArtikels.findIndex(
        (artikel) => artikel.id === action.id,
      );

      const updatedArtikel = action.payload.countView;

      const spreadArtikel = [...state.sortArtikels];
      spreadArtikel[artikelIndex].countView = updatedArtikel;
      return {
        ...state,
        sortArtikels: spreadArtikel,
        loading: false,
        error: null,
      };
    case ARTIKEL_DETAIL:
      return {
        ...state,
        loading: false,
        error: null,
        artikelData: action.payload,
      };
    case ARTIKEL_FETCH_LIKE:
      return {
        ...state,
        loading: false,
        error: null,
        likeArtikel: action.payload,
      };
    case ARTIKEL_FETCH_BOOKMARK:
      return {
        ...state,
        loading: false,
        error: null,
        bookmarkArtikel: action.payload,
        messages: null,
      };
    case ARTIKEL_ISLIKE:
      const user = new Users(
        action.payload.uid,
        action.payload.name,
        action.payload.image,
        action.payload.email,
        action.payload.typeUser,
      );
      return {
        ...state,
        loading: false,
        error: null,
        likeArtikel: state.likeArtikel.concat(user),
      };
    case ARTIKEL_ISBOOKMARK:
      const artikel = new Article(
        action.payload.id,
        action.payload.imageUrl,
        action.payload.judul,
        action.payload.hashtag,
        action.payload.idCategory,
        action.payload.partOne,
        action.payload.partTwo,
        action.payload.partThree,
        action.payload.time,
        action.payload.idPenulis,
        action.payload.countView,
      );
      return {
        ...state,
        loading: false,
        error: null,
        bookmarkArtikel: state.bookmarkArtikel.concat(artikel),
        messages: 'success',
      };
    case ARTIKEL_ISUNLIKE:
      return {
        ...state,
        likeArtikel: state.likeArtikel.filter(
          (artikel) => artikel.id !== action.id,
        ),
        loading: false,
        error: null,
        messages: null,
      };
    case ARTIKEL_ISUNBOOKMARK:
      return {
        ...state,
        bookmarkArtikel: state.bookmarkArtikel.filter(
          (artikel) => artikel.id !== action.id,
        ),
        loading: false,
        error: null,
        messages: null,
      };
    default:
      return state;
  }
};
