import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './modules';

const middlewares = applyMiddleware(ReduxThunk);

const store = createStore(
  rootReducer,
  composeWithDevTools(middlewares),
);

export default store;
