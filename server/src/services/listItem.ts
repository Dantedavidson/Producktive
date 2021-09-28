import { BoardDocument, Column, Task } from '../models/board';
import _ from 'lodash';
import { v4 } from 'uuid';

export function create(
  title: string = '',
  content: string = '',
  status: boolean = false
) {
  const id = v4();
  const task: Task = {
    id,
    title,
    content,
    status,
  };
  return task;
}

export function find(board: BoardDocument, taskId: string) {
  return board.tasks.get(taskId);
}

export async function addToTasks(board: BoardDocument, task: Task) {
  board.tasks.set(`${task.id}`, task);
  return board.save();
}

export async function addToList(
  board: BoardDocument,
  list: Column,
  taskId: string
) {
  const tasks = [...list.tasks, taskId];
  board.columns.set(`${list.id}`, { id: list.id, title: list.title, tasks });
  return board.save();
}

export async function removeFromList(
  board: BoardDocument,
  list: Column,
  taskId: string
) {
  const tasks = list.tasks.filter(task => {
    return task !== taskId;
  });
  board.columns.set(`${list.id}`, { id: list.id, title: list.title, tasks });
  return board.save();
}

export async function removeFromTasks(board: BoardDocument, taskId: string) {
  board.tasks.delete(taskId);
  return board.save();
}

export async function update(board: BoardDocument, task: Task) {
  board.tasks.set(`${task.id}`, {
    id: task.id,
    title: task.title,
    content: task.content,
    status: task.status,
  });
  return board.save();
}
