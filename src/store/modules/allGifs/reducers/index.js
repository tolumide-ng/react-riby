import actionTypes from '../actionTypes';

const {
  ALLGIFS_FAILURE,
  ALLGIFS_PENDING,
  ALLGIFS_SUCCESS,
} = actionTypes;

const initialState = {
  allGifStatus: 'rest',
  allGifError: null,
  allGif: [],
};

const allGifTypes = [
  ALLGIFS_FAILURE,
  ALLGIFS_SUCCESS,
  ALLGIFS_PENDING,
];

const allGifs = (state = initialState, { type, payload }) => {
  return allGifTypes.includes(type)
    ? { ...state, ...payload }
    : state;
};

export default allGifs;
