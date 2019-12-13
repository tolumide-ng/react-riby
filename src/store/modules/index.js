import { combineReducers } from 'redux';
import allGifReducer from './allGifs/reducers';
import detailedGifReducer from './detailedGif/reducers';
import searchGifReducer from './searchGif/reducers';

const rootReducer = combineReducers({
  allGifReducer,
  detailedGifReducer,
  searchGifReducer,
});

export default rootReducer;
