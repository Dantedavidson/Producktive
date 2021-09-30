import { ActionType } from '../action-types';

interface CreateUserAction {
  type: ActionType.CREATE_USER;
}
interface CreateUserSuccessAction {
  type: ActionType.CREATE_USER_SUCCESS;
  payload: string | null;
}
interface CreateUserErrorAction {
  type: ActionType.CREATE_USER_ERROR;
  payload: string;
}
interface LoginUserAction {
  type: ActionType.LOGIN_USER;
}
interface LoginUserSuccessAction {
  type: ActionType.LOGIN_USER_SUCCESS;
  payload: string | null;
}
interface LoginUserErrorAction {
  type: ActionType.LOGIN_USER_ERROR;
  payload: string;
}
interface LoginGuestSuccessAction {
  type: ActionType.LOGIN_GUEST_SUCCESS;
}
interface LogoutUserAction {
  type: ActionType.LOGOUT_USER;
}

export type UserAction =
  | CreateUserAction
  | CreateUserSuccessAction
  | CreateUserErrorAction
  | LoginUserAction
  | LoginUserSuccessAction
  | LoginUserErrorAction
  | LoginGuestSuccessAction
  | LogoutUserAction;
