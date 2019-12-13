import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import thunk from 'redux-thunk';
import { axiosCall } from '../../../../utils';

import {
  fetchAllGifsPending,
  fetchAllGifFailure,
  fetchAllGifSuccess,
  fetchAllGifAction,
} from './index';
import { actionTypes } from '../actionTypes';

require('dotenv').config();

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
const allGif = [{}, {}, {}];

describe('actions', () => {
  test('should create an action for pending allGifs request', () => {
    const expectedAction = {
      type: actionTypes.ALLGIFS_PENDING,
      payload: {
        allGifStatus: 'pending',
        allGifError: null,
        allGif: [],
      },
    };
    expect(fetchAllGifsPending()).toEqual(expectedAction);
  });

  test('should create an action for failed allGifs request', () => {
    const expectedAction = {
      type: actionTypes.ALLGIFS_FAILURE,
      payload: {
        allGifStatus: 'failure',
        allGifError: 'failed checker',
        allGif: [],
      },
    };
    expect(fetchAllGifFailure('failed checker')).toEqual(
      expectedAction,
    );
  });

  test('should create an action for successful allGifs request', () => {
    const expectedAction = {
      type: actionTypes.ALLGIFS_SUCCESS,
      payload: {
        allGifStatus: 'success',
        allGifError: null,
        allGif,
      },
    };
    expect(fetchAllGifSuccess(allGif)).toEqual(expectedAction);
  });
});

describe('Asynchronous fetch action', () => {
  let store;
  let axiosInstance;
  beforeEach(() => {
    axiosInstance = axios.create();
    moxios.install(axiosInstance);
    store = mockStore({
      allGifStatus: 'pending',
      allGifError: null,
      allGif: [],
    });
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
    store.clearActions();
  });

  test('should return all trending gifs and call allgifs actions', done => {
    const expectedActions = [
      actionTypes.ALLGIFS_PENDING,
      actionTypes.ALLGIFS_SUCCESS,
    ];

    axiosCall.mockResolvedValue({
      data: allGif,
    });
    store.dispatch(fetchAllGifAction({ history: [{}] })).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(
        action => action.type,
      );
      expect(actionTypes).toEqual(expectedActions);
    });
    done();
  });

  test('should send error as response when async action fails', done => {
    const expectedActions = [
      actionTypes.ALLGIFS_PENDING,
      actionTypes.ALLGIFS_FAILURE,
    ];

    axiosCall.mockRejectedValue(
      new CustomError({
        response: { message: 'There are no gifs at the moment' },
      }),
    );

    store.dispatch(fetchAllGifAction({ history: [{}] })).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(
        action => action.type,
      );
      expect(actionTypes).toEqual(expectedActions);
    });
    done();
  });
});
