import styled from 'styled-components';

export const List = styled.div`
  width: 18.75rem;
  padding: 0.5rem;
  background-color: rgba(196, 196, 196, 0.6);
  color: rgb(69, 68, 68);
  margin-right: 0.5rem;
  border-radius: 5px;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  width: 100%;
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
  max-width: 15rem;
`;

export const ListItemContainer = styled.div<{
  isDraggingOver: boolean;
}>``;

export const Modal = styled.div<{ $display: boolean }>`
  && {
    display: ${props => (props.$display ? '' : 'none')};
    position: absolute;
    background-color: white;
    width: 17.8125rem;
    padding: 0 0.5rem;
    border: 1px solid rgba(173, 173, 173, 0.8);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);

    svg {
      position: absolute;
      top: 2px;
      right: 2px;
      cursor: pointer;
      color: rgba(69, 68, 68, 0.8);
      font-size: 1.2rem;
    }
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
