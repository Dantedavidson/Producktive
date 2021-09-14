import { Board } from '../types';
import { Action } from '../actions/boardActions';
import { Action as ListAction } from '../actions/listActions';
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
  action: Action | ListAction
): BoardState => {
  switch (action.type) {
    case ActionType.LOAD_BOARD:
      return { loading: true, error: null, board: null };
    case ActionType.LOAD_BOARD_SUCCESS:
      return { loading: false, error: null, board: action.payload };
    case ActionType.LOAD_BOARD_ERROR:
      return { loading: false, error: action.payload, board: null };
    case ActionType.CLEAR_BOARD:
      return initialState;
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
    default:
      return state;
  }
};

export default reducer;
