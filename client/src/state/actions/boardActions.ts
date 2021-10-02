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

interface UpdateBoardAction {
  type: ActionType.UPDATE_BOARD;
}

interface UpdateBoardSuccessAction {
  type: ActionType.UPDATE_BOARD_SUCCESS;
  payload: Board;
}

interface UpdateBoardErrorAction {
  type: ActionType.UPDATE_BOARD_ERROR;
  payload: { board: Board; error: string };
}

interface ClearBoardAction {
  type: ActionType.CLEAR_BOARD;
}

export type BoardAction =
  | LoadBoardAction
  | LoadBoardSuccessAction
  | LoadBoardErrorAction
  | UpdateBoardAction
  | UpdateBoardSuccessAction
  | UpdateBoardErrorAction
  | ClearBoardAction;
