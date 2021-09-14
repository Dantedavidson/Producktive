import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions/listActions';

export const createList = (title: string, token: string) => {
  return async (dispatch: Dispatch<Action>) => {
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
