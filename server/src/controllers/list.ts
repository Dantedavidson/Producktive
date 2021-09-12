import { Request, Response, NextFunction } from 'express';
import * as ListService from '../services/list';
import * as BoardService from '../services/board';

export const createList = async function (req: Request, res: Response) {
  try {
    const { board } = req.token;
    console.log(board);
    const list = ListService.create(req.body.title);
    const update = await ListService.addToBoard(board, list);
    return res.send(update);
  } catch (err) {
    return res.send(err);
  }
};
