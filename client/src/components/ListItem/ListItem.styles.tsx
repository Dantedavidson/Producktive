import styled from 'styled-components';
import { Edit as _Edit } from '@material-ui/icons';

interface Props {
  isDragging: boolean;
}

export const Container = styled.div<Props>`
  position: relative;
  padding: 0.3rem;
  background-color: white;
  border-radius: 3px;
  margin-bottom: 0.5rem;
  font-family: ${props => props.theme.fontMain};
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: start;
  word-wrap: break-word;
`;
export const Wrapper = styled.div`
  svg {
    cursor: pointer;
  }
`;
export const Title = styled.p`
  width: 15rem;
`;
export const Text = styled.p``;

export const Edit = styled(_Edit)`
  && {
    font-size: 1rem;
    color: grey;
  }
`;
