import { Request, Response, NextFunction } from 'express';
import { validateUser } from '../models/user';
import Board from '../models/board';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import * as UserService from '../services/user';
import * as BoardService from '../services/board';

interface Data {
  token: string | null;
  error: string | null;
}

export const createUser = async function (req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const board = await BoardService.create({}, session);
    const input = {
      username: req.body.username,
      password: req.body.password,
      board: board[0].id,
    };
    const { error } = validateUser(input);
    if (error) throw error;
    const user = await UserService.create(input, session);
    const token = jwt.sign(
      {
        _id: user[0].id,
        board: user[0].board,
      },
      process.env.TOKEN_SECERET as string
    );
    await session.commitTransaction();
    res.send({ token: token, error: null });
  } catch (err) {
    console.log(err);
    res.send({ token: null, error: 'Something went wrong' });
  } finally {
    session.endSession();
  }
};

export const loginUser = async function (req: Request, res: Response) {
  try {
    const user = await UserService.find(req.body.username);

    if (!user)
      return res
        .status(400)
        .json({ token: null, error: 'Incorrect user details' });

    const match = await user.comparePasswords(req.body.password as string);
    if (!match)
      return res
        .status(400)
        .json({ token: null, error: 'Incorrect user details' });

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
      .json({ token: token, error: null });
  } catch (err) {
    res.status(400).json({ token: null, error: `${err}` });
  }
};

export const getUser = async function (req: Request, res: Response) {
  res.send('This is a response');
};

export const deleteUser = async function (req: Request, res: Response) {
  try {
    const result = await UserService.remove(req.token._id);
    res.send(result);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const deleteAllUsers = async function (req: Request, res: Response) {
  try {
    const resultBoard = await BoardService.removeAll();
    const resultUser = await UserService.removeAll();
    res.send({ resultBoard, resultUser });
  } catch (err) {
    res.status(404).send(err);
  }
};
