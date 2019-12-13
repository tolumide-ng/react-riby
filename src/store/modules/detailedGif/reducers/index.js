import actionTypes from '../actionTypes';

const {
  DETAILEDGIF_FAILURE,
  DETAILEDGIF_PENDING,
  DETAILEDGIF_SUCCESS,
} = actionTypes;

export const initialState = {
  detailedGifStatus: 'rest',
  detailedGifError: null,
  detailedGif: {},
};

const detailedGifTypes = [
  DETAILEDGIF_FAILURE,
  DETAILEDGIF_PENDING,
  DETAILEDGIF_SUCCESS,
];

const detailedGif = (state = initialState, { type, payload }) => {
  return detailedGifTypes.includes(type)
    ? { ...state, ...payload }
    : state;
};

export default detailedGif;
