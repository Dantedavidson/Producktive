import { ActionType } from '../action-types';
import { Board, Column, Task } from '../types';

interface createListItemAction {
  type: ActionType.CREATE_TASK;
  payload: Board;
}

interface updateListItemAction {
  type: ActionType.UPDATE_TASK;
  payload: Task;
}

interface moveListItemAction {
  type: ActionType.MOVE_TASK;
  payload: { from: Column; to: Column };
}

export type ListItemAction =
  | createListItemAction
  | moveListItemAction
  | updateListItemAction;
