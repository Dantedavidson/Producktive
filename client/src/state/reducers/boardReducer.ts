import { Board } from '../types';
import { BoardState } from '../types';
import { BoardAction } from '../actions/boardActions';
import { ActionType } from '../action-types';

export const initialBoardState = {
  loading: false,
  error: null,
  board: null,
};

const reducer = (
  state: BoardState = initialBoardState,
  action: BoardAction
): BoardState => {
  switch (action.type) {
    case ActionType.LOAD_BOARD:
      return { loading: true, error: null, board: null };
    case ActionType.LOAD_BOARD_SUCCESS:
      return { loading: false, error: null, board: action.payload };
    case ActionType.LOAD_BOARD_ERROR:
      return { loading: false, error: action.payload, board: null };

    case ActionType.CLEAR_BOARD:
      return initialBoardState;

    case ActionType.UPDATE_BOARD:
      return { loading: false, error: null, board: state.board };
    case ActionType.UPDATE_BOARD_SUCCESS:
      return { loading: false, error: null, board: action.payload };

    case ActionType.UPDATE_BOARD_ERROR:
      return {
        loading: false,
        error: action.payload.error,
        board: action.payload.board,
      };
    default:
      return state;
  }
};

export default reducer;
