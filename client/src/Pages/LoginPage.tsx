import { useState } from 'react';
import { Login, Signup } from '../components';

const LoginPage = () => {
  const [view, setView] = useState<'login' | 'signup'>('login');
  return view === 'login' ? (
    <Login setView={setView} />
  ) : (
    <Signup setView={setView} />
  );
};

export default LoginPage;
