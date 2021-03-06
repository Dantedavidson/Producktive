import { Request, Response } from 'express';
import { validateTask } from '../models/board';
import * as BoardService from '../services/board';
import * as ListService from '../services/list';
import * as ListItemService from '../services/listItem';

export const createTask = async function (req: Request, res: Response) {
  try {
    const { error } = validateTask(req.body.task);
    if (error) throw error;
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error board does not exist';
    const list = await ListService.find(board, req.body.listId);
    if (!list) throw 'Error creating task';

    await ListItemService.addToList(board, list, req.body.task.id);
    const updateTasks = await ListItemService.addToTasks(board, req.body.task);
    return res.send(updateTasks);
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
    return res.send(board);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Delete failure');
  }
};

export const updateTask = async function (req: Request, res: Response) {
  try {
    console.log(req.body);
    const { error } = validateTask(req.body);
    const { board: boardToken } = req.token;
    if (error) throw error;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error board does not exist';

    await ListItemService.update(board, req.body);
    return res.send('update success');
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
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

export const deleteAllTasks = async function (req: Request, res: Response) {
  try {
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error board does not exist';
    for (const i in board.columnOrder) {
      const oldList = await ListService.find(board, board.columnOrder[i]);
      if (!oldList) throw 'Error deleting tasks';
      for (const j in oldList.tasks) {
        const updatedList = await ListService.find(board, board.columnOrder[i]);
        if (!updatedList) throw 'Error finding list';
        await ListItemService.removeFromList(
          board,
          updatedList,
          oldList.tasks[j]
        );
        await ListItemService.removeFromTasks(board, oldList.tasks[j]);
      }
    }
    return res.send(board);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Delete failure');
  }
};
