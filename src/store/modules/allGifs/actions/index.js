import { axiosCall } from '../../../../utils';
import actionTypes from '../actionTypes';

const {
  ALLGIFS_FAILURE,
  ALLGIFS_PENDING,
  ALLGIFS_SUCCESS,
} = actionTypes;

export const fetchAllGifsPending = () => ({
  type: ALLGIFS_PENDING,
  payload: {
    allGifStatus: 'pending',
    allGifError: null,
    allGif: [],
  },
});

export const fetchAllGifFailure = allGifError => ({
  type: ALLGIFS_FAILURE,
  payload: {
    allGifStatus: 'failure',
    allGifError,
    allGif: [],
  },
});

export const fetchAllGifSuccess = allGif => ({
  type: ALLGIFS_SUCCESS,
  payload: {
    allGifStatus: 'success',
    allGifError: null,
    allGif,
  },
});

export const fetchAllGifAction = ({
  history = {},
}) => async dispatch => {
  dispatch(fetchAllGifsPending());
  try {
    const response = await axiosCall({
      path: `/trending?api_key=rBH9uuUQzYfxNwXwbhbcQEFTRE46Yp3W&limit=25&rating=G`,
      method: 'GET',
    });
    return dispatch(fetchAllGifSuccess(response.data));
  } catch (error) {
    return dispatch(fetchAllGifFailure(error));
  }
};
