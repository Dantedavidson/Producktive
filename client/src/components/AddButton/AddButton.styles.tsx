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
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};

  &:hover {
    color: ${({ active }) => !active && 'rgba(69, 68, 68, 0.8)'};
  }
`;

export const ListButton = styled(Button)`
  && {
    background-color: ${({ active }) =>
      active ? 'rgba(196, 196, 196, 0.5)' : 'rgba(196, 196, 196, 0.25)'};
    font-size: 1.5rem;

    min-width: 18.75rem;
    padding: 0.5rem;
    svg {
      font-size: 2rem;
    }
    &:hover {
      background-color: rgba(196, 196, 196, 0.5);
    }
  }
`;

export const ItemButton = styled(Button)`
  background-color: ${({ active }) =>
    active ? 'rgba(245, 245, 245, 0.6)' : 'rgba(245, 245, 245, 0.4)'};
  font-size: 1rem;
  width: 100%;
  padding: 0.3rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
