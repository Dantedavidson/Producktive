import { ActionType } from '../action-types';
import { Board, Column, Task } from '../types';

interface createListItemAction {
  type: ActionType.CREATE_TASK;
  payload: Board;
}

export type ListItemAction = createListItemAction;
