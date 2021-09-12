import { Request, Response, NextFunction } from 'express';
import * as ListService from '../services/list';
import * as BoardService from '../services/board';

export const createList = async function (req: Request, res: Response) {
  try {
    const { board } = req.token;
    const list = ListService.create(req.body.title);
    const update = await ListService.addToBoard(board, list);
    return res.send(update);
  } catch (err) {
    return res.send(err);
  }
};

export const deleteList = async function (req: Request, res: Response) {
  try {
    const { board } = req.token;
    const update = await ListService.remove(board, req.body.listId);
    return res.send(update);
  } catch (err) {
    return res.send(err);
  }
};

export const updateList = async function (req: Request, res: Response) {
  try {
    const { board } = req.token;
    const updateTitle = await ListService.updateTitle(
      board,
      req.body.listId,
      req.body.title
    );
    const updateTasks = await ListService.updateTasks(
      board,
      req.body.listId,
      req.body.tasks
    );
    return res.send({ updateTitle, updateTasks });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};
