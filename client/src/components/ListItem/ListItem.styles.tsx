import styled from 'styled-components';
import { Edit as _Edit } from '@material-ui/icons';
import { CheckCircleOutline, RadioButtonUnchecked } from '@material-ui/icons';

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
  min-height: 20px;
  justify-content: space-between;
  align-items: start;
  word-wrap: break-word;
`;
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 2.5625rem;
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
  margin-bottom: 0.5rem;
`;
export const Title = styled.p<{ status: boolean }>`
  text-decoration: ${props => props.status && 'line-through'};
  color: ${props => props.status && 'grey'};
  max-width: 14rem;
  flex-grow: 1;
`;
export const ModalTitle = styled.h2`
  font-size: 1.2rem;
  max-width: 95%;
`;
export const SmallText = styled.p`
  font-size: 0.8rem;
  font-weight: 800;
  color: rgba(69, 68, 68, 0.6);
`;
export const Text = styled.p<{ $content?: string }>`
  background-color: ${props => !props.$content && '#091e420a'};
  font-size: 0.875rem;
  padding: 0.3rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => !props.$content && '#091e4214'};
  }
`;

export const Edit = styled(_Edit)`
  && {
    font-size: 1rem;
    color: rgba(69, 68, 68, 0.6);

    &:hover {
      color: rgba(69, 68, 68, 0.8);
    }
  }
`;

export const Complete = styled(CheckCircleOutline)`
  && {
    color: green;
  }
`;

export const Incomplete = styled(RadioButtonUnchecked)`
  && {
    color: rgba(69, 68, 68, 0.6);

    &:hover {
      color: rgba(69, 68, 68, 0.8);
    }
  }
`;
