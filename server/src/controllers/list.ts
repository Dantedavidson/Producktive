import { Request, Response, NextFunction } from 'express';
import * as ListService from '../services/list';
import * as BoardService from '../services/board';
import { BoardDocument } from '../models/board';
import { validateColumn, validateColumnOrder } from '../models/board';

export const createList = async function (req: Request, res: Response) {
  try {
    const { error } = validateColumn({ title: req.body.title });
    if (error) throw error;
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Error creating list';
    const list = ListService.create(req.body.title);
    const update = await ListService.addToBoard(board, list);
    return res.send(update);
  } catch (err) {
    return res.send(err);
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
    const update = await ListService.remove(board, req.body.id);
    return res.send(update);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

export const updateList = async function (req: Request, res: Response) {
  try {
    const { error } = validateColumn(req.body);
    if (error) throw error;
    const { board: boardToken } = req.token;
    const board = await BoardService.find(boardToken);
    if (!board) throw 'Could not find board';
    const list = await ListService.find(board, req.body.id);
    if (!list) throw 'Error updating list';

    const update = await ListService.update(board, list);

    return res.send({ update });
  } catch (err) {
    res.status(404).send(err);
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
