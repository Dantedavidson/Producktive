import axios from 'axios';
import { Dispatch } from 'redux';
import { Column, Board, UserState } from '../types';
import { ActionType } from '../action-types';
import { ListAction } from '../actions/listActions';
import { v4 } from 'uuid';
import { BoardAction } from '../actions/boardActions';

export const createList = (board: Board, user: UserState, title: string) => {
  return async (dispatch: Dispatch<BoardAction>) => {
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
          { title },
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

// dispatch({
//   type: ActionType.CREATE_LIST,
//   payload: { list: data.list, columnOrder: data.columnOrder },
// });

export const deleteList = (listId: string, token: string) => {
  return async (dispatch: Dispatch<ListAction>) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/list/${listId}`,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      const newState = {
        id: data._id,
        tasks: data.tasks,
        columns: data.columns,
        columnOrder: data.columnOrder,
      };
      dispatch({ type: ActionType.DELETE_LIST, payload: newState });
    } catch (err) {}
  };
};

export const clearList = (listId: string, token: string) => {
  return async (dispatch: Dispatch<ListAction>) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/list/clear/${listId}`,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      const newState = {
        id: data._id,
        tasks: data.tasks,
        columns: data.columns,
        columnOrder: data.columnOrder,
      };
      dispatch({ type: ActionType.CLEAR_LIST, payload: newState });
    } catch (err) {}
  };
};

export const copyList = (listId: string, token: string) => {
  return async (dispatch: Dispatch<ListAction>) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/list/copy`,
        {
          listId,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      const board = {
        id: data._id,
        tasks: data.tasks,
        columns: data.columns,
        columnOrder: data.columnOrder,
      };
      dispatch({ type: ActionType.COPY_LIST, payload: board });
    } catch (err) {
      console.log(err);
    }
  };
};

export const reorderList = (columnOrder: string[], token: string) => {
  return async (dispatch: Dispatch<ListAction>) => {
    try {
      dispatch({
        type: ActionType.REORDER_LIST,
        payload: columnOrder,
      });
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/list/reorder`,
        { columnOrder },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateList = (list: Column, token: string) => {
  return async (dispatch: Dispatch<ListAction>) => {
    try {
      dispatch({
        type: ActionType.UPDATE_LIST,
        payload: list,
      });
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/list/update`,
        { list },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
};
