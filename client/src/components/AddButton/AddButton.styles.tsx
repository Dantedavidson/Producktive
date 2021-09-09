import styled from 'styled-components';

const Button = styled.button`
  background-color: rgba(196, 196, 196, 0.25);
  color: rgba(69, 68, 68, 0.6);
  font-family: 'Balsamiq Sans', cursive;
  border-radius: 5px;
  transition: all 250ms ease;
  padding: 0.5rem 1rem;
  text-align: left;
  &:hover {
    background-color: rgba(196, 196, 196, 0.5);
    color: rgba(69, 68, 68, 0.8);
  }
`;

export const ListButton = styled(Button)`
  font-size: 1.5rem;
  width: 18.75rem;
`;

export const ItemButton = styled(Button)`
  font-size: 1rem;
`;
