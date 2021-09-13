import { Request, Response, NextFunction } from 'express';
import { BoardDocument } from '../models/board';
import * as BoardService from '../services/board';
import * as ListService from '../services/list';
import * as ListItemService from '../services/listItem';

export const createTask = async function (req: Request, res: Response) {
  try {
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    const list = await ListService.find(
      board as BoardDocument,
      req.body.listId
    );
    console.log(list, board);
    if (!board || !list) throw 'Error creating task';

    const task = ListItemService.create(req.body.title);
    const updateList = await ListItemService.addToList(board, list, task.id);
    const updateTasks = await ListItemService.addToTasks(board, task);
    return res.send({ updateList, updateTasks });
  } catch (err) {
    return res.send(err);
  }
};
