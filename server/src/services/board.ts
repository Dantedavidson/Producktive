import Board, { BoardDocument } from '../models/board';

export async function create(input: BoardDocument | {}) {
  return Board.create(input);
}

export async function find(id: string) {
  return Board.findById(id).populate('columns');
}

export async function remove(id: string) {
  return Board.deleteOne({ id: id });
}
export async function removeAll() {
  return Board.deleteMany();
}
