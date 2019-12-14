import reducer, { initialState } from './index';
import { actionTypes } from '../actionTypes';

// detailedGifStatus: 'rest',
const detailedGifError = 'the error';
const detailedGif = { id: '', images: {} };

describe('Detailed Gif Reducer', () => {
  test('should return the initial state', () => {
    const initialStateValue = reducer(undefined, {});
    expect(initialStateValue).toEqual({
      detailedGifStatus: 'rest',
      detailedGifError: null,
      detailedGif: {},
    });
  });

  test('should handle fetch detailed gif pending', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.DETAILEDGIF_PENDING,
        payload: {
          detailedGifStatus: 'pending',
          detailedGifError: null,
          detailedGif: {},
        },
      }),
    ).toEqual({
      detailedGifStatus: 'pending',
      detailedGifError: null,
      detailedGif: {},
    });
  });

  test('should handle fetch detailed gif failure', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.DETAILEDGIF_FAILURE,
        payload: {
          detailedGifStatus: 'failure',
          detailedGifError,
          detailedGif,
        },
      }),
    ).toEqual({
      detailedGifStatus: 'failure',
      detailedGifError,
      detailedGif,
    });
  });

  test('should handle fetch detailed gif success', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.DETAILEDGIF_SUCCESS,
        payload: {
          detailedGifStatus: 'success',
          detailedGifError: null,
          detailedGif: {},
        },
      }),
    ).toEqual({
      detailedGifStatus: 'success',
      detailedGifError: null,
      detailedGif: {},
    });
  });
});
