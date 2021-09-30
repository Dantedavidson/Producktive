import { Redirect } from 'react-router';
import { useAppSelector } from '../hooks';
import { Header, Container } from '../components';

const BoardPage = () => {
  const user = useAppSelector(state => state.user);

  if (!user.token && !user.guest) return <Redirect to='/' />;
  return (
    <>
      <Header />
      <Container />
    </>
  );
};

export default BoardPage;
