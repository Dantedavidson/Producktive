import axios from 'axios';
import { Dispatch } from 'redux';
import { Board, Column, Task, UserState } from '../types';
import { ActionType } from '../action-types';
import { ListItemAction } from '../actions/listItemActions';
import { BoardAction } from '../actions/boardActions';
import { v4 } from 'uuid';

export const createListItem = (
  board: Board,
  listId: string,
  title: string,
  userState: UserState
) => {
  return async (dispatch: Dispatch<BoardAction>) => {
    const newBoard: Board = Object.assign({}, board);
    const newList: Column = Object.assign({}, board.columns[listId]);

    const newTask: Task = {
      id: v4(),
      title,
      content: '',
      status: false,
    };

    newList.tasks.push(newTask.id);
    newBoard.tasks[newTask.id] = newTask;
    newBoard.columns[newList.id] = newList;

    dispatch({ type: ActionType.UPDATE_BOARD_SUCCESS, payload: newBoard });

    if (userState.guest)
      return localStorage.setItem('board', JSON.stringify(newBoard));

    if (userState.token) {
      try {
        axios.post(
          `${process.env.REACT_APP_SERVER_URL}/listItem`,
          { title, listId },
          {
            headers: {
              'x-auth-token': userState.token,
            },
          }
        );
      } catch (err) {
        dispatch({
          type: ActionType.UPDATE_BOARD_ERROR,
          payload: { error: 'Could not create task', board },
        });
      }
    }
  };
};

export const updateListItem = (
  board: Board,
  task: Task,
  userState: UserState
) => {
  return async (dispatch: Dispatch<BoardAction>) => {
    const newBoard = Object.assign({}, board);
    newBoard.tasks[task.id] = task;

    dispatch({ type: ActionType.UPDATE_BOARD_SUCCESS, payload: newBoard });
    if (userState.guest)
      return localStorage.setItem('board', JSON.stringify(newBoard));

    if (userState.token) {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/listItem/update`,
          { ...task },
          {
            headers: {
              'x-auth-token': userState.token,
            },
          }
        );
      } catch (err) {
        dispatch({
          type: ActionType.UPDATE_BOARD_ERROR,
          payload: { error: 'Could not update task', board: newBoard },
        });
      }
    }
  };
};

export const deleteListItem = (
  board: Board,
  taskId: string,
  listId: string,
  userState: UserState
) => {
  return async (dispatch: Dispatch<BoardAction>) => {
    const newBoard: Board = Object.assign({}, board);
    const newList: Column = Object.assign({}, board.columns[listId]);

    newList.tasks = newList.tasks.filter(task => task !== taskId);
    delete newBoard.tasks[taskId];
    newBoard.columns[listId] = newList;

    dispatch({ type: ActionType.UPDATE_BOARD_SUCCESS, payload: newBoard });

    if (userState.guest)
      return localStorage.setItem('board', JSON.stringify(newBoard));
    if (userState.token) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/listItem/delete`,
          {
            headers: {
              'x-auth-token': userState.token,
            },
            data: {
              taskId,
              listId,
            },
          }
        );
      } catch (err) {
        dispatch({ type: ActionType.UPDATE_BOARD_SUCCESS, payload: board });
      }
    }
  };
};
