import actionTypes from '../actionTypes';

const {
  SEARCHGIFS_FAILURE,
  SEARCHGIFS_PENDING,
  SEARCHGIFS_SUCCESS,
} = actionTypes;

const initialState = {
  searchGifStatus: 'rest',
  searchGifError: null,
  searchGifResult: [],
};

const searchGifTypes = [
  SEARCHGIFS_FAILURE,
  SEARCHGIFS_PENDING,
  SEARCHGIFS_SUCCESS,
];

const searchGifs = (state = initialState, { type, payload }) => {
  return searchGifTypes.includes(type)
    ? { ...state, ...payload }
    : state;
};

export default searchGifs;
