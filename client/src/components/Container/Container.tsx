import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector, useActions } from '../../hooks';
import { AddButton, Lists } from '../index';
import * as S from './Container.styles';

const Container = () => {
  const boardState = useAppSelector(state => state.board);
  const { logoutUser } = useActions();
  useEffect(() => {
    if (!boardState.error) return;
    toast.error(boardState.error, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: 'board-error',
    });
  }, [boardState.error]);
  return (
    <S.Container>
      <S.LogoutWrap onClick={logoutUser}>
        <S.Text>Logout</S.Text>
        <S.Logout />
      </S.LogoutWrap>

      <S.FlexWrap>
        {boardState.loading ? (
          ''
        ) : (
          <>
            <Lists />
            <AddButton btnType='list' />
          </>
        )}
      </S.FlexWrap>
    </S.Container>
  );
};

export default Container;
