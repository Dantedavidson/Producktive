import Board, { BoardDocument, Column, Task } from '../models/board';
import _ from 'lodash';
import { find } from './board';
import { v4 } from 'uuid';

export function create(title: string = '') {
  const id = v4();
  const task: Task = {
    id,
    title,
    content: '',
  };
  return task;
}

export async function addToTasks(boardId: string, task: Task) {
  const board = await find(boardId);
  if (!board) return null;
  board.tasks.set(`${task.id}`, task);
  return board.save();
}

export async function addToList(
  boardId: string,
  listId: string,
  taskId: string
) {
  const board = await find(boardId);
  if (!board) return null;
  const temp = board.columns.get(`${listId}`) as Column;
  const tasks = [...temp.tasks, taskId];
  board.columns.set(`${listId}`, { id: temp.id, title: temp.title, tasks });
  return board.save();
}
