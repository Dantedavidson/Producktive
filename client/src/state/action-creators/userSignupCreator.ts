import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions/userActions';

interface UserDetails {
  username: string;
  password: string;
  confirm: string;
}

export const signupUser = (userDetails: UserDetails) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CREATE_USER,
    });
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          username: userDetails.username,
          password: userDetails.password,
        }
      );
      dispatch({
        type: ActionType.CREATE_USER_SUCCESS,
        payload: data.token,
      });
    } catch (err) {
      dispatch({
        type: ActionType.CREATE_USER_ERROR,
        payload: err.message,
      });
    }
  };
};
