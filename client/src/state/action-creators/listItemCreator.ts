import axios from 'axios';
import { Dispatch } from 'redux';
import { Board } from '..';
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
