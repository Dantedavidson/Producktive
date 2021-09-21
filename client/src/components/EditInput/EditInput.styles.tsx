import styled from 'styled-components';
import { TextareaAutosize, TextField } from '@material-ui/core';

export const Input = styled(TextareaAutosize)`
  && {
    width: 100%;
    padding: 0.2rem;
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fontMain};
    font-size: inherit;
    color: rgb(69, 68, 68);

    :focus-visible {
      outline: none;
    }
  }
`;
export const Row = styled.div`
  display: flex;
  color: rgba(69, 68, 68, 0.6);
`;
