import Board, { BoardDocument } from '../models/board';

export async function createBoard(input: BoardDocument | {}) {
  return Board.create(input);
}
