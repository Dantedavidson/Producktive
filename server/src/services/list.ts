import Board, { BoardDocument, Column } from '../models/board';
import { find } from './board';
import { v4 } from 'uuid';

export function create(title: string) {
  const id = v4();
  const list: Column = {
    id: id,
    title: title,
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
