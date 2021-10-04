import styled from 'styled-components';

interface Props {
  active: boolean;
}
const Button = styled.div<Props>`
  font-family: 'Balsamiq Sans', cursive;
  color: rgba(69, 68, 68);
  border-radius: 5px;
  transition: background-color 250ms ease, color 250ms ease;
  text-align: left;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
`;

export const ListButton = styled(Button)`
  && {
    background-color: ${({ active }) =>
      active ? 'rgba(196, 196, 196, 0.9)' : 'rgba(196, 196, 196, 0.6)'};
    font-size: 1.5rem;

    min-width: 18.75rem;
    padding: 0.5rem;
    svg {
      font-size: 2rem;
    }
    &:hover {
      background-color: rgba(196, 196, 196, 0.9);
    }
  }
`;

export const ItemButton = styled(Button)`
  background-color: ${({ active }) =>
    active ? 'rgba(245, 245, 245, 0.6)' : 'rgba(245, 245, 245, 0.4)'};
  font-size: 1rem;
  width: 100%;
  padding: 0.3rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
