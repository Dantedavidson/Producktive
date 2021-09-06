import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions/userActions';

interface UserDetails {
  username: string;
  password: string;
}

export const loginUser = (userDetails: UserDetails) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN_USER,
    });

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        {
          username: userDetails.username,
          password: userDetails.password,
        }
      );
      console.log(data);
      console.log(data.token);
      dispatch({
        type: ActionType.LOGIN_USER_SUCCESS,
        payload: data.token,
      });
    } catch (err) {
      dispatch({
        type: ActionType.LOGIN_USER_ERROR,
        payload: err.message,
      });
    }
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGOUT_USER,
    });
  };
};
