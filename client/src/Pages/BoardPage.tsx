import { Redirect } from 'react-router';
import { useAppSelector } from '../hooks';
import { Header, Container } from '../components';

const BoardPage = () => {
  const { user: userState, board: boardState } = useAppSelector(state => state);

  if ((!userState.token && !userState.guest) || boardState.board === null)
    return <Redirect to='/' />;
  return (
    <>
      <Header />
      <Container />
    </>
  );
};

export default BoardPage;
