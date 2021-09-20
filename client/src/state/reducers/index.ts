import { combineReducers } from 'redux';
import userReducer from './userReducer';
import boardReducer from './boardReducer';
export { initialBoardState } from './boardReducer';
export { initialUserState } from './userReducer';

const reducers = combineReducers({
  user: userReducer,
  board: boardReducer,
});

export default reducers;
