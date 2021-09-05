import { Request, Response, NextFunction } from 'express';
import User, { UserDocument, UserDetails } from '../models/user';
import jwt from 'jsonwebtoken';
import Board from '../models/board';
import { createUser as _createUser, findUser } from '../services/user';
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

export const loginUser = async function (req: Request, res: Response) {
  try {
    const user = await findUser(req.body.username);

    if (!user)
      return res
        .status(400)
        .json({ data: null, error: 'Incorrect user details' });

    const match = await user.comparePasswords(req.body.password as string);
    if (!match)
      return res
        .status(400)
        .json({ data: null, error: 'Incorrect user details' });

    const token = jwt.sign(
      {
        _id: user._id,
        board: user.board,
      },
      process.env.TOKEN_SECERET as string
    );

    return res
      .status(200)
      .header('auth-token', token)
      .json({ data: token, error: null });
  } catch (err) {
    res.status(400).json({ data: null, error: `${err}` });
  }
};

export const getUser = async function (req: Request, res: Response) {
  res.send('This is a response');
};
