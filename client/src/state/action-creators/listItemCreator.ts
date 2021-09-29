import axios from 'axios';
import { Dispatch } from 'redux';
import { Column, Task } from '..';
import { ActionType } from '../action-types';
import { ListItemAction } from '../actions/listItemActions';

export const createListItem = (
  listId: string,
  title: string,
  token: string
) => {
  return async (dispatch: Dispatch<ListItemAction>) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/listItem`,
        { title, listId },
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
      dispatch({
        type: ActionType.CREATE_TASK,
        payload: board,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateListItem = (item: Task, token: string) => {
  return async (dispatch: Dispatch<ListItemAction>) => {
    try {
      dispatch({
        type: ActionType.UPDATE_TASK,
        payload: item,
      });
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/listItem/update`,
        { ...item },
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

export const deleteListItem = (
  taskId: string,
  listId: string,
  token: string
) => {
  return async (dispatch: Dispatch<ListItemAction>) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/listItem/delete`,
        {
          headers: {
            'x-auth-token': token,
          },
          data: {
            taskId,
            listId,
          },
        }
      );
      dispatch({ type: ActionType.DELETE_TASK, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const moveListItem = (from: Column, to: Column, token: string) => {
  return async (dispatch: Dispatch<ListItemAction>) => {
    try {
      dispatch({
        type: ActionType.MOVE_TASK,
        payload: { from, to },
      });
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/list/updateMany`,
        { lists: [from, to] },
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
