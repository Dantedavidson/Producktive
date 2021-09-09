import styled from 'styled-components';

export const List = styled.div`
  width: 18.75rem;
  padding: 0.5rem;
  background-color: rgba(196, 196, 196, 0.6);
  color: rgb(69, 68, 68);
  margin-right: 0.5rem;
  border-radius: 5px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  svg {
    align-self: center;
    cursor: pointer;
  }
`;

export const Title = styled.div`
  font-family: ${props => props.theme.fontMain};
  font-weight: 800;
  font-size: 1.5rem;
`;

interface Container {
  isDraggingOver: boolean;
}
export const ListItemContainer = styled.div<Container>``;
