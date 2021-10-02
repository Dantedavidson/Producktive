import { useState } from 'react';
import { useAppSelector } from '../hooks';
import { Login, Signup, Loading } from '../components';
import { Redirect } from 'react-router';

const LoginPage = () => {
  const [view, setView] = useState<'login' | 'signup'>('login');
  const { user: userState, board: boardState } = useAppSelector(state => state);

  if (
    (userState.token || userState.guest) &&
    boardState.board !== null &&
    !boardState.loading
  )
    return <Redirect to='/Board' />;

  if (boardState.loading) return <Loading />;
  return view === 'login' ? (
    <Login setView={setView} />
  ) : (
    <Signup setView={setView} />
  );
};

export default LoginPage;
