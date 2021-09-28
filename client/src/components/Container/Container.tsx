import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { AddButton, Lists } from '../index';
import ScrollContainer from 'react-indiana-drag-scroll';
import React, { ReactChild } from 'react';

interface ScrollProps {
  className?: string;
  children: React.ReactNode;
}

const Scroll = ({ children, className }: ScrollProps) => (
  <ScrollContainer
    className={className}
    ignoreElements='.no-drag'
    hideScrollbars={false}
  >
    {children}
  </ScrollContainer>
);
const ContainerStyled = styled(Scroll)`
  overflow-y: hidden;
  overflow-x: auto;
  padding: 1rem;
  width: 100vw;
  height: calc(100vh - 8rem);

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
const FlexWrap = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
`;

const Container = () => {
  const boardState = useAppSelector(state => state.board);
  return (
    <ContainerStyled>
      <FlexWrap>
        {boardState.loading ? (
          ''
        ) : (
          <>
            <Lists />
            <AddButton btnType='list' />
          </>
        )}
      </FlexWrap>
    </ContainerStyled>
  );
};

export default Container;
