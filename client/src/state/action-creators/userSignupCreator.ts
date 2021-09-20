import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { UserAction } from '../actions/userActions';
import { BoardAction } from '../actions/boardActions';

interface UserDetails {
  username: string;
  password: string;
  confirm: string;
}

export const signupUser = (userDetails: UserDetails) => {
  return async (dispatch: Dispatch<UserAction | BoardAction>) => {
    dispatch({
      type: ActionType.CREATE_USER,
    });
    dispatch({
      type: ActionType.LOAD_BOARD,
    });
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          username: userDetails.username,
          password: userDetails.password,
        }
      );
      console.log(data.token);
      dispatch({
        type: ActionType.CREATE_USER_SUCCESS,
        payload: data.token,
      });
      dispatch({
        type: ActionType.LOAD_BOARD_SUCCESS,
        payload: { id: data.boardId, tasks: {}, columns: {}, columnOrder: [] },
      });
    } catch (err) {
      dispatch({
        type: ActionType.CREATE_USER_ERROR,
        payload: err.message,
      });
      dispatch({
        type: ActionType.LOAD_BOARD_ERROR,
        payload: 'Could not load board',
      });
    }
  };
};
