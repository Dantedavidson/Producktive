import styled from 'styled-components';

interface Props {
  isDragging: boolean;
}

export const Container = styled.div<Props>`
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
export const Wrapper = styled.div``;
export const Title = styled.p`
  max-width: 15rem;
`;
