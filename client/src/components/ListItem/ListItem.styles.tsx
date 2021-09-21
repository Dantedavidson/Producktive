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
export const ModalBg = styled.div<{ $active: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  display: ${props => (props.$active ? '' : 'none')};
`;
export const Wrap = styled.div`
  margin: 1rem 0;
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
`;
export const Title = styled.p`
  width: 15rem;
`;
export const ModalTitle = styled.h2`
  font-size: 1.2rem;
`;
export const SmallText = styled.p`
  font-size: 0.8rem;
  font-weight: 800;
`;
export const Text = styled.p``;

export const Edit = styled(_Edit)`
  && {
    font-size: 1rem;
    color: grey;
  }
`;
