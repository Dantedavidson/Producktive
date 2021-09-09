import { Redirect } from 'react-router';
import { useActions, useAppSelector } from '../hooks';
import { Header, Container } from '../components';

const BoardPage = () => {
  const user = useAppSelector(state => state.user);
  const { logoutUser } = useActions();
  if (!user.token) return <Redirect to='/' />;
  return (
    <>
      <Header />
      <Container />
      <button onClick={() => logoutUser()}>Click</button>
    </>
  );
};

export default BoardPage;
