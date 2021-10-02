import axios from 'axios';
import { Dispatch } from 'redux';
import { Column, Board, UserState } from '../types';
import { ActionType } from '../action-types';
import { v4 } from 'uuid';
import { BoardAction } from '../actions/boardActions';

export const createList = (board: Board, user: UserState, title: string) => {
  return async (dispatch: Dispatch<BoardAction>) => {
    dispatch({ type: ActionType.UPDATE_BOARD });

    const newBoard: Board = Object.assign({}, board);
    const newList: Column = {
      id: v4(),
      title,
      tasks: [],
    };
    newBoard.columns[newList.id] = newList;
    newBoard.columnOrder.push(newList.id);
    dispatch({
      type: ActionType.UPDATE_BOARD_SUCCESS,
      payload: newBoard,
    });

    if (user.guest) {
      localStorage.setItem('board', JSON.stringify(newBoard));
      return;
    }

    if (user.token) {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/list`,
          { list: newList },
          {
            headers: {
              'x-auth-token': user.token,
            },
          }
        );
      } catch (err) {
        dispatch({
          type: ActionType.UPDATE_BOARD_ERROR,
          payload: { error: 'Could not create list', board },
        });
      }
    }
  };
};

export const deleteList = (board: Board, user: UserState, id: string) => {
  return async (dispatch: Dispatch<BoardAction>) => {
    dispatch({ type: ActionType.UPDATE_BOARD });

    const newBoard: Board = Object.assign({}, board);
    delete newBoard.columns[id];
    newBoard.columnOrder = board.columnOrder.filter(col => col !== id);

    dispatch({ type: ActionType.UPDATE_BOARD_SUCCESS, payload: newBoard });

    if (user.guest) {
      localStorage.setItem('board', JSON.stringify(newBoard));
      return;
    }
    if (user.token) {
      try {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/list/${id}`, {
          headers: {
            'x-auth-token': user.token,
          },
        });
      } catch (err) {
        dispatch({
          type: ActionType.UPDATE_BOARD_ERROR,
          payload: { error: 'Could not delete list.', board },
        });
      }
    }
  };
};

export const clearList = (board: Board, list: Column, user: UserState) => {
  return async (dispatch: Dispatch<BoardAction>) => {
    dispatch({ type: ActionType.UPDATE_BOARD });

    const newBoard: Board = Object.assign({}, board);
    const newList: Column = Object.assign({}, list);

    newList.tasks = [];
    list.tasks.forEach(task => {
      delete newBoard.tasks[task];
    });

    newBoard.columns[list.id] = newList;

    dispatch({ type: ActionType.UPDATE_BOARD_SUCCESS, payload: newBoard });
    if (user.guest) {
      localStorage.setItem('board', JSON.stringify(newBoard));
      return;
    }
    if (user.token) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/list/clear/${list.id}`,
          {
            headers: {
              'x-auth-token': user.token,
            },
          }
        );
      } catch (err) {
        dispatch({
          type: ActionType.UPDATE_BOARD_ERROR,
          payload: { error: 'Could not clear list.', board },
        });
      }
    }
  };
};

export const copyList = (board: Board, list: Column, user: UserState) => {
  return async (dispatch: Dispatch<BoardAction>) => {
    dispatch({ type: ActionType.UPDATE_BOARD });

    const newBoard: Board = Object.assign({}, board);
    const newTaskIds: string[] = [];

    list.tasks.forEach(task => {
      const newTask = Object.assign({}, board.tasks[task]);
      newTask.id = v4();
      newBoard.tasks[newTask.id] = newTask;
      newTaskIds.push(newTask.id);
    });

    const newList: Column = Object.assign({}, list);
    newList.id = v4();
    newList.tasks = newTaskIds;
    newBoard.columns[newList.id] = newList;

    const startIndex = board.columnOrder.indexOf(list.id);
    newBoard.columnOrder.splice(startIndex, 0, newList.id);

    dispatch({ type: ActionType.UPDATE_BOARD_SUCCESS, payload: newBoard });

    if (user.guest)
      return localStorage.setItem('board', JSON.stringify(newBoard));

    if (user.token) {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/list/copy`,
          {
            listId: list.id,
          },
          {
            headers: {
              'x-auth-token': user.token,
            },
          }
        );
      } catch (err) {
        dispatch({
          type: ActionType.UPDATE_BOARD_ERROR,
          payload: { error: 'Could not copy list.', board },
        });
      }
    }
  };
};

export const reorderList = (
  board: Board,
  columnOrder: string[],
  userState: UserState
) => {
  return async (dispatch: Dispatch<BoardAction>) => {
    dispatch({ type: ActionType.UPDATE_BOARD });

    const newBoard = Object.assign({}, board);
    newBoard.columnOrder = columnOrder;

    dispatch({ type: ActionType.UPDATE_BOARD_SUCCESS, payload: newBoard });

    if (userState.guest)
      return localStorage.setItem('board', JSON.stringify(newBoard));
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/list/reorder`,
        { columnOrder },
        {
          headers: {
            'x-auth-token': userState.token,
          },
        }
      );
    } catch (err) {
      dispatch({ type: ActionType.UPDATE_BOARD_SUCCESS, payload: board });
    }
  };
};

export const updateList = (
  board: Board,
  list: Column,
  userState: UserState
) => {
  return async (dispatch: Dispatch<BoardAction>) => {
    dispatch({ type: ActionType.UPDATE_BOARD });

    const newBoard = Object.assign({}, board);
    newBoard.columns[list.id] = list;

    dispatch({ type: ActionType.UPDATE_BOARD_SUCCESS, payload: newBoard });
    if (userState.guest)
      return localStorage.setItem('board', JSON.stringify(newBoard));

    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/list/update`,
        { list },
        {
          headers: {
            'x-auth-token': userState.token,
          },
        }
      );
    } catch (err) {
      dispatch({
        type: ActionType.UPDATE_BOARD_ERROR,
        payload: { error: 'Could not update list', board },
      });
    }
  };
};
