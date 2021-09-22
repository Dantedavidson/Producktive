import Board, { BoardDocument, Column } from '../models/board';
import _ from 'lodash';
import { find as findBoard } from './board';
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

export async function update(board: BoardDocument, list: Column) {
  console.log('i went off');
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
