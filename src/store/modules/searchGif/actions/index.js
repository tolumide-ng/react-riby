import { axiosCall } from '../../../../utils';
import actionTypes from '../actionTypes';

const {
  SEARCHGIFS_FAILURE,
  SEARCHGIFS_PENDING,
  SEARCHGIFS_SUCCESS,
} = actionTypes;

export const searchGifPending = () => ({
  type: SEARCHGIFS_PENDING,
  payload: {
    searchGifStatus: 'pending',
    searchGifError: null,
    searchGifResult: [],
  },
});

export const searchGifFailure = searchGifError => ({
  type: SEARCHGIFS_FAILURE,
  payload: {
    searchGifStatus: 'failure',
    searchGifError,
    searchGifResult: [],
  },
});

export const searchGifSuccess = searchGifResult => ({
  type: SEARCHGIFS_SUCCESS,
  payload: {
    searchGifStatus: 'success',
    searchGifError: null,
    searchGifResult,
  },
});

export const searchGifAction = ({
  history = {},
  searchText,
  offset = 0,
}) => async dispatch => {
  dispatch(searchGifPending());
  try {
    const response = await axiosCall({
      path: `/search?api_key=rBH9uuUQzYfxNwXwbhbcQEFTRE46Yp3W&q=${searchText}&limit=25&offset=${offset}&rating=G&lang=en`,
      method: 'GET',
    });
    dispatch(searchGifSuccess(response));
  } catch (error) {
    return dispatch(searchGifFailure(error));
  }
};
