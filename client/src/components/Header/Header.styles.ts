import styled from 'styled-components';

interface Props {
  small?: boolean;
}

export const Header = styled.header<Props>`
  display: flex;
  justify-content: space-around;
  margin-bottom: ${props => (props.small ? '' : '3rem')};
  padding: 1rem;
`;
export const Image = styled.img<Props>`
  height: 2rem;
`;
