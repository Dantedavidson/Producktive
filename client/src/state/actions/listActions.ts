import { ActionType } from '../action-types';
import { Board, Column, Task } from '../types';

interface CreateListAction {
  type: ActionType.CREATE_LIST;
  payload: { list: Column; columnOrder: string[] };
}

interface UpdateListAction {
  type: ActionType.UPDATE_LIST;
  payload: Column;
}

interface DeleteListAction {
  type: ActionType.DELETE_LIST;
  payload: string;
}

interface ReorderListAction {
  type: ActionType.REORDER_LIST;
  payload: string[];
}

export type Action =
  | CreateListAction
  | UpdateListAction
  | DeleteListAction
  | ReorderListAction;
