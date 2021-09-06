import { useState } from 'react';
import { useAppSelector } from '../hooks';
import { Login, Signup } from '../components';
import { Redirect } from 'react-router';

const LoginPage = () => {
  const [view, setView] = useState<'login' | 'signup'>('login');
  const user = useAppSelector(state => state.user);

  if (user.token) return <Redirect to='/Board' />;
  return view === 'login' ? (
    <Login setView={setView} />
  ) : (
    <Signup setView={setView} />
  );
};

export default LoginPage;
