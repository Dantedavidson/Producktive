import styled from 'styled-components';
import { TextareaAutosize } from '@material-ui/core';

export const ListWrapper = styled.div`
  height: 100%;
  display: inline-block;
`;
export const List = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 18.75rem;
  max-height: calc(100vh - 12rem);
  margin-right: 0.5rem;
  padding: 0.5rem;
  background-color: rgb(230, 230, 230);
  color: rgb(69, 68, 68);
  border-radius: 5px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  width: 100%;
  font-family: ${props => props.theme.fontMain};
  word-wrap: break-word;
  svg {
    align-self: start;
    cursor: pointer;
  }
`;

export const Title = styled.h1`
  font-family: ${props => props.theme.fontMain};
  font-weight: 800;
  font-size: 1.5rem;
  flex-grow: 1;
  max-width: 15rem;
`;

export const ListItemContainer = styled.div`
  flex: 1 1 auto;
  min-height: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgb(210, 210, 210);

  /* For Chrome, Edge, and Safari */

  &::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    background: inherit;
  }
  &::-webkit-scrollbar-track {
    border-right: 8px solid rgb(240, 240, 240);
    margin-bottom: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    border-right: 8px solid rgb(210, 210, 210);
    margin-bottom: 0.5rem;
  }
`;

export const Text = styled.p<{ $isTitle?: boolean }>`
  margin: 0.5rem 0;
  font-family: ${props => props.theme.fontMain};
  font-size: ${props => (props.$isTitle ? '1.2rem' : '1rem')};
  text-align: ${props => (props.$isTitle ? 'center' : 'left')};
  cursor: ${props => (props.$isTitle ? 'default' : 'pointer')};
  color: rgba(69, 68, 68, 0.7);
  &:hover {
    color: ${props => !props.$isTitle && 'rgb(69, 68, 68)'};
  }
`;

export const Input = styled(TextareaAutosize)`
  && {
    min-width: 16.25rem;
    max-width: 16.25rem;
  }
`;
