import { Request, Response, NextFunction } from 'express';

import * as ListItemService from '../services/listItem';

export const createTask = async function (req: Request, res: Response) {
  try {
    const { board } = req.token;
    const task = ListItemService.create(req.body.title);
    const updateList = await ListItemService.addToList(
      board,
      req.body.list,
      task.id
    );
    const updateTasks = await ListItemService.addToTasks(board, task);
    return res.send({ updateList, updateTasks });
  } catch (err) {
    return res.send(err);
  }
};
