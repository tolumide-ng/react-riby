import { axiosCall } from '../../../../utils';
import actionTypes from '../actionTypes';

const {
  DETAILEDGIF_FAILURE,
  DETAILEDGIF_PENDING,
  DETAILEDGIF_SUCCESS,
} = actionTypes;

export const fetchDetailedGifPending = () => ({
  type: DETAILEDGIF_PENDING,
  payload: {
    detailedGifStatus: 'pending',
    detailedGifError: null,
    detailedGif: {},
  },
});

export const fetchDetailedGifFailure = detailedGifError => ({
  type: DETAILEDGIF_FAILURE,
  payload: {
    detailedGifStatus: 'failure',
    detailedGifError,
    detailedGif: {},
  },
});

export const fetchDetailedGifSuccess = detailedGif => ({
  type: DETAILEDGIF_SUCCESS,
  payload: {
    detailedGifStatus: 'success',
    detailedGifError: null,
    detailedGif,
  },
});

export const fetchDetailedGifAction = ({
  history = {},
  id,
}) => async dispatch => {
  dispatch(fetchDetailedGifPending());
  try {
    const response = await axiosCall({
      path: `${id}?api_key=rBH9uuUQzYfxNwXwbhbcQEFTRE46Yp3W`,
      method: 'GET',
    });

    const data = response && response.data;
    return dispatch(fetchDetailedGifSuccess(data));
  } catch (err) {
    return dispatch(fetchDetailedGifFailure(err));
  }
};
