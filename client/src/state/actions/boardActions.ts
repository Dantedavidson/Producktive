import { ActionType } from '../action-types';
import { Board } from '../types';

interface LoadBoardAction {
  type: ActionType.LOAD_BOARD;
}

interface LoadBoardSuccessAction {
  type: ActionType.LOAD_BOARD_SUCCESS;
  payload: Board;
}

interface LoadBoardErrorAction {
  type: ActionType.LOAD_BOARD_ERROR;
  payload: string;
}

interface ClearBoardAction {
  type: ActionType.CLEAR_BOARD;
}

export type Action =
  | LoadBoardAction
  | LoadBoardSuccessAction
  | LoadBoardErrorAction
  | ClearBoardAction;
