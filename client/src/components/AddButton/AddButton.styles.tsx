import styled from 'styled-components';

const Button = styled.button`
  font-family: 'Balsamiq Sans', cursive;
  color: rgba(69, 68, 68, 0.6);
  border-radius: 5px;
  transition: all 250ms ease;
  text-align: left;

  &:hover {
    color: rgba(69, 68, 68, 0.8);
  }
`;

export const ListButton = styled(Button)`
  background-color: rgba(196, 196, 196, 0.25);
  font-size: 1.5rem;
  width: 18.75rem;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: rgba(196, 196, 196, 0.5);
  }
`;

export const ItemButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 1rem;
  width: 100%;
  padding: 0.3rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;
