import { TextareaAutosize, TextField } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  active: boolean;
}
const Button = styled.div<Props>`
  font-family: 'Balsamiq Sans', cursive;
  color: rgba(69, 68, 68, 0.6);
  border-radius: 5px;
  transition: all 250ms ease;
  text-align: left;
  cursor: ${({ active }) => active && 'default'};

  &:hover {
    color: ${({ active }) => !active && 'rgba(69, 68, 68, 0.8)'};
  }
`;

export const ListButton = styled(Button)`
  background-color: ${({ active }) =>
    active ? 'rgba(196, 196, 196, 0.5)' : 'rgba(196, 196, 196, 0.25)'};
  font-size: 1.5rem;
  width: 18.75rem;
  padding: 0.5rem;
  &:hover {
    background-color: rgba(196, 196, 196, 0.5);
  }
`;

export const ItemButton = styled(Button)`
  background-color: ${({ active }) =>
    active ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)'};
  font-size: 1rem;
  width: 100%;
  padding: 0.3rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

export const Input = styled(TextareaAutosize)`
  && {
    width: 100%;
    padding: 0.2rem;
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fontMain};
    font-size: 1.5rem;

    :focus-visible {
      outline: none;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 7.5rem;
`;
