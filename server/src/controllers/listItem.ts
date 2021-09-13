import { Request, Response, NextFunction } from 'express';
import { BoardDocument, validateTask } from '../models/board';
import * as BoardService from '../services/board';
import * as ListService from '../services/list';
import * as ListItemService from '../services/listItem';

export const createTask = async function (req: Request, res: Response) {
  try {
    const { error } = validateTask(req.body);
    if (error) throw error;
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error board does not exist';
    const list = await ListService.find(board, req.body.listId);
    if (!list) throw 'Error creating task';

    const task = ListItemService.create(req.body.title);
    const updateList = await ListItemService.addToList(board, list, task.id);
    const updateTasks = await ListItemService.addToTasks(board, task);
    return res.send({ updateList, updateTasks });
  } catch (err) {
    return res.send(err);
  }
};
