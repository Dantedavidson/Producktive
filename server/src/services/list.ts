import Board, { BoardDocument, Column } from '../models/board';
import _ from 'lodash';
import { find } from './board';
import { v4 } from 'uuid';

export function create(title: string) {
  const id = v4();
  const list: Column = {
    id,
    title,
    tasks: [],
  };
  console.log(list);
  return list;
}

export async function addToBoard(id: string, list: Column) {
  const board = await find(id);
  board?.columns.set(`${list.id}`, list);
  board?.columnOrder.push(list.id);
  return board?.save();
}

export async function remove(boardId: string, listId: string) {
  const board = await find(boardId);
  if (!board) return null;
  board.columns.delete(listId);
  board.columnOrder = board.columnOrder.filter(item => item !== listId);
  return board.save();
}

export async function updateTitle(
  boardId: string,
  listId: string,
  title: string
) {
  const board = await find(boardId);
  if (!board) return null;
  const temp = board.columns.get(`${listId}`) as Column;
  board.set(`columns.${listId}`, {
    tasks: temp.tasks,
    id: temp.id,
    title: title,
  });
  return board.save();
}
// board
export async function updateTasks(
  boardId: string,
  listId: string,
  tasks: string[]
) {
  const board = await find(boardId);
  if (!board) return null;
  const temp = board.columns.get(`${listId}`) as Column;
  board.set(`columns.${listId}`, {
    tasks: tasks,
    id: temp.id,
    title: temp.title,
  });

  return board.save();
}
export async function reorder(boardId: string, columnOrder: string[]) {
  const board = await find(boardId);
  if (!board) return null;
  board.columnOrder = columnOrder;
  return board.save();
}
