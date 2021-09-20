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
