import { Board } from '../types';
import { Action } from '../actions/boardActions';
import { ActionType } from '../action-types';

interface BoardState {
  loading: boolean;
  error: string | null;
  board: Board | null;
}

const initialState = {
  loading: false,
  error: null,
  board: null,
};

const reducer = (
  state: BoardState = initialState,
  action: Action
): BoardState => {
  switch (action.type) {
    case ActionType.LOAD_BOARD:
      return { loading: true, error: null, board: null };
    case ActionType.LOAD_BOARD_SUCCESS:
      return { loading: false, error: null, board: action.payload };
    case ActionType.LOAD_BOARD_ERROR:
      return { loading: false, error: action.payload, board: null };
    default:
      return state;
  }
};

export default reducer;
