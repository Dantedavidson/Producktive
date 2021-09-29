import { useAppSelector, useActions } from '../../hooks';
import { AddButton, Lists } from '../index';
import * as S from './Container.styles';

const Container = () => {
  const boardState = useAppSelector(state => state.board);
  const { logoutUser } = useActions();
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
