import { UserAction } from '../actions/userActions';
import { ActionType } from '../action-types';
import { UserState } from '../types';

export const initialUserState = {
  loading: false,
  error: null,
  token: null,
  guest: false,
};

const reducer = (
  state: UserState = initialUserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case ActionType.CREATE_USER:
      return { loading: true, error: null, token: null, guest: false };
    case ActionType.CREATE_USER_SUCCESS:
      return {
        loading: false,
        error: null,
        token: action.payload,
        guest: false,
      };
    case ActionType.CREATE_USER_ERROR:
      return {
        loading: false,
        error: action.payload,
        token: null,
        guest: false,
      };

    case ActionType.LOGIN_USER:
      return { loading: true, error: null, token: null, guest: false };
    case ActionType.LOGIN_GUEST_SUCCESS:
      return { loading: true, error: null, token: null, guest: true };
    case ActionType.LOGIN_USER_SUCCESS:
      return {
        loading: false,
        error: null,
        token: action.payload,
        guest: false,
      };
    case ActionType.LOGIN_USER_ERROR:
      return {
        loading: false,
        error: action.payload,
        token: null,
        guest: false,
      };
    case ActionType.LOGOUT_USER:
      return initialUserState;

    default:
      return state;
  }
};

export default reducer;
