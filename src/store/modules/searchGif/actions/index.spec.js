import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { axiosCall } from '../../../../utils';

import {
  searchGifSuccess,
  searchGifAction,
  searchGifPending,
  searchGifFailure,
} from './index';
import { actionTypes } from '../actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
jest.mock('../../../../utils');

const searchGifResult = [{}, {}, {}, {}];

class CustomError extends Error {
  constructor(message, option = 'string') {
    super(message);
    this.response =
      option === 'object'
        ? { data: { message: this.message } }
        : { data: { message: false } };
  }
}

describe('actions', () => {
  test('should create an action for pending searchGif request', () => {
    const expectedAction = {
      type: actionTypes.SEARCHGIFS_PENDING,
      payload: {
        searchGifStatus: 'pending',
        searchGifError: null,
        searchGifResult: [],
      },
    };
    expect(searchGifPending()).toEqual(expectedAction);
  });

  test('should create an action for failed searchGifs request', () => {
    const expectedAction = {
      type: actionTypes.SEARCHGIFS_FAILURE,
      payload: {
        searchGifStatus: 'failure',
        searchGifError: 'There was a problem',
        searchGifResult: [],
      },
    };
    expect(searchGifFailure('There was a problem')).toEqual(
      expectedAction,
    );
  });

  test('should create an action for successful searchGifs request', () => {
    const expectedAction = {
      type: actionTypes.SEARCHGIFS_SUCCESS,
      payload: {
        searchGifStatus: 'success',
        searchGifError: null,
        searchGifResult,
      },
    };
    expect(searchGifSuccess(searchGifResult)).toEqual(expectedAction);
  });
});

describe('Asynchronous fetch action', () => {
  let store;
  let axiosInstance;
  beforeEach(() => {
    axiosInstance = axios.create();
    moxios.install(axiosInstance);
    store = mockStore({
      searchGifStatus: 'rest',
      searchGifError: null,
      searchGifResult: [],
    });
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
    store.clearActions();
  });

  test('should return all searchGifs result', done => {
    const expectedActions = [
      actionTypes.SEARCHGIFS_PENDING,
      actionTypes.SEARCHGIFS_SUCCESS,
    ];

    axiosCall.mockResolvedValue({
      data: searchGifResult,
    });

    store
      .dispatch(
        searchGifAction({ history: [{}], searchText: 'search' }),
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(
          action => action.type,
        );
        expect(actionTypes).toEqual(expectedActions);
      });
    done();
  });

  test('should send appropriate error response when async fails', done => {
    const expectdActions = [
      actionTypes.SEARCHGIFS_PENDING,
      actionTypes.SEARCHGIFS_FAILURE,
    ];
    axiosCall.mockRejectedValue(
      new CustomError({
        response: { message: 'Error' },
      }),
    );

    store
      .dispatch(
        searchGifAction({ history: [{}], searchText: 'search' }),
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(
          action => action.type,
        );
        expect(actionTypes).toEqual(expectdActions);
      });
    done();
  });
});
