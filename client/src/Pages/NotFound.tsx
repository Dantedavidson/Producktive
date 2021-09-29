import { Redirect, useHistory } from 'react-router';
import styled from 'styled-components';
import { Header } from '../components';
import Duck from '../images/duck.svg';

const Container = styled.div`
  max-width: 25rem;
  height: 60vh;
  max-height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: white;
  margin: auto;
  padding: 0.5rem;
  text-align: center;
`;
const Text = styled.h1<{ $link?: boolean }>`
  font-family: ${props => props.theme.fontMain};
  text-decoration: ${props => props.$link && 'underline'};
  cursor: ${props => props.$link && 'pointer'};
`;

const Image = styled.img`
  width: 6.25rem;
  margin: 0 auto;
`;
const NotFound = () => {
  const history = useHistory();
  return (
    <>
      <Header />
      <Container>
        <div>
          <Text>Sorry</Text>
          <Text>We couldnt find what you were looking for</Text>
        </div>
        <Image src={Duck} alt='The Iconic Producktive Duck' />
        <Text $link onClick={() => history.push('/')}>
          Take Me Back
        </Text>
      </Container>
    </>
  );
};

export default NotFound;
