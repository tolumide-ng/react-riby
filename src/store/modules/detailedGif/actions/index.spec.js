import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import thunk from 'redux-thunk';
import { axiosCall } from '../../../../utils';

import {
  fetchDetailedGifSuccess,
  fetchDetailedGifFailure,
  fetchDetailedGifPending,
  fetchDetailedGifAction,
} from './index';

import { actionTypes } from '../actionTypes';

class CustomError extends Error {
  constructor(message, option = 'string') {
    super(message);
    this.response =
      option === 'object'
        ? { data: { message: this.message } }
        : { data: { message: false } };
  }
}

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
jest.mock('../../../../utils');
const detailedGif = {
  name: 'detials',
  images: { original: '' },
  id: '',
};

describe('actions', () => {
  test('should create an action fo pending detailedGif request', () => {
    const expectedAction = {
      type: actionTypes.DETAILEDGIF_PENDING,
      payload: {
        detailedGifStatus: 'pending',
        detailedGifError: null,
        detailedGif: {},
      },
    };

    expect(fetchDetailedGifPending()).toEqual(expectedAction);
  });

  test('should create an action for a failed detailedGif request', () => {
    const expectedAction = {
      type: actionTypes.DETAILEDGIF_FAILURE,
      payload: {
        detailedGifStatus: 'failure',
        detailedGifError: 'failed detail',
        detailedGif: {},
      },
    };

    expect(fetchDetailedGifFailure('failed detail')).toEqual(
      expectedAction,
    );
  });

  test('should create an action for a successful detailedGif request', () => {
    const expectedAction = {
      type: actionTypes.DETAILEDGIF_SUCCESS,
      payload: {
        detailedGifStatus: 'success',
        detailedGifError: null,
        detailedGif,
      },
    };

    expect(fetchDetailedGifSuccess(detailedGif)).toEqual(
      expectedAction,
    );
  });
});

describe('Asynchronous fetch detailedGif actions', () => {
  let store;
  let axiosInstance;
  beforeEach(() => {
    axiosInstance = axios.create();
    moxios.install(axiosInstance);
    store = mockStore({
      detailedGifStatus: 'rest',
      detailedGifError: null,
      detailedGif: {},
    });
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
    store.clearActions();
  });

  test('should return details about the gif and call all necessary actions', done => {
    const expectedActions = [
      actionTypes.DETAILEDGIF_PENDING,
      actionTypes.DETAILEDGIF_SUCCESS,
    ];

    axiosCall.mockResolvedValue({
      data: detailedGif,
    });

    store
      .dispatch(fetchDetailedGifAction({ history: [{}], id: '' }))
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(
          action => action.type,
        );
        expect(actionTypes).toEqual(expectedActions);
      });
    done();
  });

  test('should send appropriate error when async fails', done => {
    const expectedActions = [
      actionTypes.DETAILEDGIF_PENDING,
      actionTypes.DETAILEDGIF_FAILURE,
    ];
    axiosCall.mockRejectedValue(
      new CustomError({
        response: { message: 'Not Found' },
      }),
    );

    store
      .dispatch(fetchDetailedGifAction({ history: [{}] }))
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(
          action => action.type,
        );
        expect(actionTypes).toEqual(expectedActions);
      });
    done();
  });
});
