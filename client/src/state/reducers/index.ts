import { combineReducers } from 'redux';
import userReducer from './userReducer';
import boardReducer from './boardReducer';

const reducers = combineReducers({
  user: userReducer,
  board: boardReducer,
});

export default reducers;
