import { Redirect } from 'react-router';
import { useActions, useAppSelector } from '../hooks';

const BoardPage = () => {
  const user = useAppSelector(state => state.user);
  const { logoutUser } = useActions();
  if (!user.token) return <Redirect to='/' />;
  return (
    <div>
      <h1>This is the board page</h1>
      <button onClick={() => logoutUser()}>Click</button>
    </div>
  );
};

export default BoardPage;
