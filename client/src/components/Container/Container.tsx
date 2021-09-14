import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { AddButton, Lists } from '../index';
const ContainerStyled = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Container = () => {
  const boardState = useAppSelector(state => state.board);
  return (
    <ContainerStyled>
      {boardState.loading ? (
        ''
      ) : (
        <>
          <Lists />
          <AddButton btnType='list' />
        </>
      )}
    </ContainerStyled>
  );
};

export default Container;
