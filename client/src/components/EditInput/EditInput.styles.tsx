import { TextareaAutosize } from '@material-ui/core';
import styled from 'styled-components';

export const Input = styled(TextareaAutosize)`
  && {
    width: 100%;
    padding: 0.2rem;
    margin: 0.5rem 0;
    color: rgb(69, 68, 68);
  }
`;

export const Row = styled.div`
  display: flex;
  color: rgba(69, 68, 68, 0.6);
`;
