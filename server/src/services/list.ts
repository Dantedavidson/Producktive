import { v4 } from 'uuid';
import { BoardDocument, Column } from '../models/board';

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

export async function find(board: BoardDocument, listId: string) {
  return board.columns.get(`${listId}`);
}

export async function addToBoard(board: BoardDocument, list: Column) {
  board.columns.set(`${list.id}`, list);
  board.columnOrder.push(list.id);
  return board.save();
}

export async function remove(board: BoardDocument, listId: string) {
  board.columns.delete(listId);
  board.columnOrder = board.columnOrder.filter(item => item !== listId);
  return board.save();
}

export async function clear(board: BoardDocument, list: Column) {
  board.set(`columns.${list.id}`, {
    tasks: [],
    id: list.id,
    title: list.title,
  });
  console.log('this is the board');
  return board.save();
}

export async function update(board: BoardDocument, list: Column) {
  board.set(`columns.${list.id}`, {
    tasks: list.tasks,
    id: list.id,
    title: list.title,
  });
  console.log('this is the board');
  return board.save();
}

export async function reorder(board: BoardDocument, columnOrder: string[]) {
  board.columnOrder = columnOrder;
  return board.save();
}
