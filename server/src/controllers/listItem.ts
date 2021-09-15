import { Request, Response, NextFunction } from 'express';
import { BoardDocument, validateTask } from '../models/board';
import * as BoardService from '../services/board';
import * as ListService from '../services/list';
import * as ListItemService from '../services/listItem';

export const createTask = async function (req: Request, res: Response) {
  try {
    const { error } = validateTask({ title: req.body.title });
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

export const deleteTask = async function (req: Request, res: Response) {
  try {
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error board does not exist';
    const list = await ListService.find(board, req.body.listId);
    if (!list) throw 'Error deleting task';

    await ListItemService.removeFromList(board, list, req.body.taskId);
    await ListItemService.removeFromTasks(board, req.body.taskId);
    return res.send('Delete success');
  } catch (err) {
    console.log(err);
    return res.status(400).send('Delete failure');
  }
};

export const updateTask = async function (req: Request, res: Response) {
  try {
    const { error } = validateTask(req.body);
    const { board: boardToken } = req.token;
    if (error) throw error;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error board does not exist';

    await ListItemService.update(board, req.body);
    return res.send('update success');
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const reorderTask = async function (req: Request, res: Response) {
  try {
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error board does not exist';
    const update = await ListService.find(board, req.body.from);
    if (!update) throw 'Error could not find list';

    await ListService.update(board, update);
    return res.send('Reorder success');
  } catch (err) {
    return res.status(400).send('Could not reorder items');
  }
};

export const moveTask = async function (req: Request, res: Response) {
  try {
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error board does not exist';
    const remove = await ListService.find(board, req.body.from);
    const add = await ListService.find(board, req.body.to);
    if (!remove || !add) throw 'Error could not find list';

    await ListService.update(board, remove);
    await ListService.update(board, add);
    return res.send('Move success');
  } catch (err) {
    console.log(err);
    return res.status(400).send('Move failure');
  }
};
