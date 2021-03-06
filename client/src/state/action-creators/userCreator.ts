import axios from 'axios';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { UserAction } from '../actions/userActions';
import { BoardAction } from '../actions/boardActions';
import { Board } from '../types';
interface UserDetails {
  username: string;
  password: string;
  confirm?: string;
}

export const loginUser = (userDetails: UserDetails) => {
  return async (dispatch: Dispatch<UserAction | BoardAction>) => {
    dispatch({
      type: ActionType.LOGIN_USER,
    });
    dispatch({
      type: ActionType.LOAD_BOARD,
    });

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        {
          username: userDetails.username,
          password: userDetails.password,
        }
      );
      dispatch({
        type: ActionType.LOGIN_USER_SUCCESS,
        payload: data.token,
      });
      const { board } = data;
      dispatch({
        type: ActionType.LOAD_BOARD_SUCCESS,
        payload: {
          id: board._id,
          tasks: board.tasks,
          columns: board.columns,
          columnOrder: board.columnOrder,
        },
      });
    } catch (err) {
      toast.error('Incorrect username or password', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 'login-error',
      });
      dispatch({
        type: ActionType.LOGIN_USER_ERROR,
        payload: err.message,
      });
      dispatch({
        type: ActionType.LOAD_BOARD_ERROR,
        payload: 'Could not load board',
      });
    }
  };
};

export const logoutUser = () => {
  return (dispatch: Dispatch<UserAction | BoardAction>) => {
    dispatch({
      type: ActionType.LOGOUT_USER,
    });
    dispatch({
      type: ActionType.CLEAR_BOARD,
    });
  };
};

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
      if (data.error) throw data.error;
      dispatch({
        type: ActionType.CREATE_USER_SUCCESS,
        payload: data.token,
      });
      dispatch({
        type: ActionType.LOAD_BOARD_SUCCESS,
        payload: { id: data.boardId, tasks: {}, columns: {}, columnOrder: [] },
      });
      toast.success('Signup Success', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 'Signup-success',
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: ActionType.CREATE_USER_ERROR,
        payload: err.message,
      });
      dispatch({
        type: ActionType.LOAD_BOARD_ERROR,
        payload: 'Could not load board',
      });
      toast.error(err, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 'Signup-error',
      });
    }
  };
};

export const loginGuest = () => {
  return (dispatch: Dispatch<UserAction | BoardAction>) => {
    dispatch({
      type: ActionType.LOGIN_USER,
    });
    dispatch({
      type: ActionType.LOAD_BOARD,
    });

    const board = localStorage.getItem('board');
    if (board === null) {
      const newBoard: Board = {
        id: 'local board',
        tasks: {},
        columns: {},
        columnOrder: [],
      };
      localStorage.setItem('board', JSON.stringify(newBoard));
      dispatch({
        type: ActionType.LOAD_BOARD_SUCCESS,
        payload: newBoard,
      });
    } else {
      dispatch({
        type: ActionType.LOAD_BOARD_SUCCESS,
        payload: JSON.parse(board),
      });
    }
    dispatch({ type: ActionType.LOGIN_GUEST_SUCCESS });
  };
};
