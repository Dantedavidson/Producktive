import ScrollContainer from 'react-indiana-drag-scroll';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { AddButton, Lists } from '../index';

const ContainerStyled = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
  overflow-y: hidden;
  overflow-x: auto;
  height: calc(100vh - 8rem);
  width: 100vw;

  /* For Chrome, Edge, and Safari */

  &::-webkit-scrollbar {
    background: inherit;
  }
  &::-webkit-scrollbar-track {
    border-bottom: 8px solid rgb(240, 240, 240);
    margin-bottom: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    border-bottom: 8px solid rgb(210, 210, 210);
    margin-bottom: 0.5rem;
  }
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
