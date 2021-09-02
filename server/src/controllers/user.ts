import { Request, Response, NextFunction } from 'express';
import User, { UserDocument, UserDetails } from '../models/user';
import Board from '../models/board';
import { createUser as _createUser } from '../services/user';
import { createBoard as _createBoard } from '../services/board';

export const createUser = async function (req: Request, res: Response) {
  try {
    const board = await _createBoard({});
    await board.save();
    const input = {
      username: req.body.username,
      password: req.body.password,
      board: board.id,
    };
    const user = await _createUser(input);
    await user.save();
    res.send({ board, user });
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async function (req: Request, res: Response) {
  res.send('This is a response');
};
