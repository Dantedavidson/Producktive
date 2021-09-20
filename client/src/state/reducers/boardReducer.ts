import { Board } from '../types';
import { BoardAction } from '../actions/boardActions';
import { ListAction } from '../actions/listActions';
import { ActionType } from '../action-types';
import { ListItemAction } from '../actions/listItemActions';

interface BoardState {
  loading: boolean;
  error: string | null;
  board: Board | null;
}

export const initialBoardState = {
  loading: false,
  error: null,
  board: null,
};

const reducer = (
  state: BoardState = initialBoardState,
  action: BoardAction | ListAction | ListItemAction
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
    case ActionType.CREATE_LIST:
      return {
        loading: false,
        error: null,
        board: {
          ...(state.board as Board),
          columns: {
            ...state.board?.columns,
            [`${action.payload.list.id}`]: action.payload.list,
          },
          columnOrder: action.payload.columnOrder,
        },
      };
    case ActionType.DELETE_LIST:
      return {
        loading: false,
        error: null,
        board: action.payload,
      };
    case ActionType.REORDER_LIST:
      return {
        loading: false,
        error: null,
        board: { ...(state.board as Board), columnOrder: action.payload },
      };
    case ActionType.CREATE_TASK:
      return {
        loading: false,
        error: null,
        board: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
