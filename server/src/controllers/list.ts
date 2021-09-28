import { Request, Response, NextFunction } from 'express';
import * as ListService from '../services/list';
import * as BoardService from '../services/board';
import * as ListItemService from '../services/listItem';
import _ from 'lodash';
import { validateColumn, validateColumnOrder, Column } from '../models/board';

export const createList = async function (req: Request, res: Response) {
  try {
    const { error } = validateColumn({ title: req.body.title });
    if (error) throw error;
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error creating list';
    const list = ListService.create(req.body.title);
    const update = await ListService.addToBoard(board, list);

    return res.send({
      columnOrder: update.columnOrder,
      list: update.columns.get(list.id),
    });
  } catch (err) {
    return res.send(err);
  }
};

export const copyList = async function (req: Request, res: Response) {
  try {
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error finding board';
    const oldList = await ListService.find(board, req.body.listId);
    if (!oldList) throw 'Error finding list';
    const newList = ListService.create(oldList.title);

    for (const task of oldList.tasks) {
      const oldTask = await ListItemService.find(board, task);
      if (!oldTask) throw 'Error finding task';
      let newTask = ListItemService.create(
        oldTask.title,
        oldTask.content,
        oldTask.status
      );
      newList.tasks.push(newTask.id);
      await ListItemService.addToTasks(board, newTask);
    }
    const update = await ListService.addToBoard(board, newList);
    return res.send(update);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

export const getLists = async function (req: Request, res: Response) {
  try {
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    return res.send(board?.columnOrder);
  } catch (err) {
    return res.status(400).send('Something went wrong');
  }
};

export const deleteList = async function (req: Request, res: Response) {
  try {
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error deleting list';
    const list = await ListService.find(board, req.params.id);
    if (!list) throw 'Error deleting list';
    for (const task of list.tasks) {
      await ListItemService.removeFromTasks(board, task);
    }
    const update = await ListService.remove(board, req.params.id);
    return res.send(update);
  } catch (err) {
    return res.send(err);
  }
};

export const clearList = async function (req: Request, res: Response) {
  try {
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error deleting list items';
    const list = await ListService.find(board, req.params.id);
    if (!list) throw 'Error deleting list items';
    for (const task of list.tasks) {
      await ListItemService.removeFromTasks(board, task);
    }
    const update = await ListService.clear(board, list);
    return res.send(update);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

export const updateList = async function (req: Request, res: Response) {
  try {
    const { error } = validateColumn(req.body.list);
    if (error) throw error;
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Could not find board';
    const update = await ListService.update(board, req.body.list);
    return res.send({ update });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

export const updateMany = async function (req: Request, res: Response) {
  try {
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Could not find board';
    const updates = [];
    for (const list of req.body.lists) {
      const { error } = validateColumn(list);
      if (error) throw error;
      const update = await ListService.update(board, list);
      updates.push(update);
    }
    return res.send({ updates });
  } catch (err) {
    console.log(err);
    return res.status(404).send(err);
  }
};

export const updateListOrder = async function (req: Request, res: Response) {
  try {
    const { error } = validateColumnOrder(req.body);
    if (error) throw error;
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error updating list order';
    const update = await ListService.reorder(board, req.body.columnOrder);
    return res.send(update);
  } catch (err) {
    return res.status(404).send(err);
  }
};
