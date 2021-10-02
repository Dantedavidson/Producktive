import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const Container = styled.div`
  border: 1px solid grey;
  background-color: white;
  border-radius: 5px;
  max-width: 23rem;
  height: 30.375rem;
  margin: 10vh auto 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Loading = () => {
  return (
    <Container>
      <CircularProgress style={{ margin: 'auto' }} />
    </Container>
  );
};

export default Loading;
