import { Action } from '../actions/userActions';
import { ActionType } from '../action-types';

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}
const initialState = {
  loading: false,
  error: null,
  token: null,
};

const reducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionType.CREATE_USER:
      return { loading: true, error: null, token: null };
    case ActionType.CREATE_USER_SUCCESS:
      return { loading: false, error: null, token: action.payload };
    case ActionType.CREATE_USER_ERROR:
      return { loading: false, error: action.payload, token: null };

    case ActionType.LOGIN_USER:
      return { loading: true, error: null, token: null };
    case ActionType.LOGIN_USER_SUCCESS:
      return { loading: false, error: null, token: action.payload };
    case ActionType.LOGIN_USER_ERROR:
      return { loading: false, error: action.payload, token: null };
    case ActionType.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default reducer;