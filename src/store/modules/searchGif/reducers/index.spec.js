import reducer, { initialState } from './index';
import { actionTypes } from '../actionTypes';

const searchGifError = 'There was an error';
const searchGifResult = [{}, {}, {}, {}];

describe('Search Gif Reducer', () => {
  test('should return the initial state', () => {
    const initialStateValue = reducer(undefined, {});
    expect(initialStateValue).toEqual({
      searchGifStatus: 'rest',
      searchGifError: null,
      searchGifResult: [],
    });
  });

  test('should handle search gif pending', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.SEARCHGIFS_PENDING,
        payload: {
          searchGifStatus: 'pending',
          searchGifError: null,
          searchGifResult: [],
        },
      }),
    ).toEqual({
      searchGifStatus: 'pending',
      searchGifError: null,
      searchGifResult: [],
    });
  });

  test('should handle search gif failure', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.SEARCHGIFS_FAILURE,
        payload: {
          searchGifStatus: 'failure',
          searchGifError,
          searchGifResult: [],
        },
      }),
    ).toEqual({
      searchGifStatus: 'failure',
      searchGifError,
      searchGifResult: [],
    });
  });

  test('should handle search gif success', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.SEARCHGIFS_SUCCESS,
        payload: {
          searchGifStatus: 'success',
          searchGifError: null,
          searchGifResult,
        },
      }),
    ).toEqual({
      searchGifStatus: 'success',
      searchGifError: null,
      searchGifResult,
    });
  });
});
