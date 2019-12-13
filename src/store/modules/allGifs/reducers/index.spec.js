import reducer, { initialState } from './index';
import types from '../actionTypes';

const { ALLGIFS_FAILURE, ALLGIFS_PENDING, ALLGIFS_SUCCESS } = types;

const allGif = [{}, {}, {}];
const allGifError = 'This is the error';

describe('AllGif Reducers', () => {
  test('should return the initial state', () => {
    const initialStateVal = reducer(undefined, {});
    expect(initialStateVal).toEqual({
      allGifStatus: 'rest',
      allGifError: null,
      allGif: [],
    });
  });

  test.skip('should handle fetch all gifs pending', () => {
    expect(
      reducer(initialState, {
        types: ALLGIFS_PENDING,
        payload: {
          allGifStatus: 'pending',
          allGifError: null,
          allGif: [],
        },
      }),
    ).toEqual({
      allGifStatus: 'pending',
      allGifError: null,
      allGif: [],
    });
  });

  test('should handle fetch all gifs success', () => {
    expect(
      reducer(initialState, {
        type: ALLGIFS_SUCCESS,
        payload: {
          allGifStatus: 'success',
          allGifError: null,
          allGif,
        },
      }),
    ).toEqual({
      allGifStatus: 'success',
      allGifError: null,
      allGif,
    });
  });

  test('should handle fetch all gifs failure', () => {
    expect(
      reducer(initialState, {
        type: ALLGIFS_FAILURE,
        payload: {
          allGifStatus: 'failure',
          allGifError,
          allGif: [],
        },
      }),
    ).toEqual({
      allGifStatus: 'failure',
      allGifError,
      allGif: [],
    });
  });
});
