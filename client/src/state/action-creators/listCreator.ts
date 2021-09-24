import axios from 'axios';
import { Dispatch } from 'redux';
import { Column } from '..';
import { ActionType } from '../action-types';
import { ListAction } from '../actions/listActions';

export const createList = (title: string, token: string) => {
  return async (dispatch: Dispatch<ListAction>) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/list`,
        { title },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      dispatch({
        type: ActionType.CREATE_LIST,
        payload: { list: data.list, columnOrder: data.columnOrder },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

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
