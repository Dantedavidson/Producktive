import * as S from './Form.styles';
import { Input } from './FormComponents';

import { Header } from '../index';
import { useActions } from '../../hooks';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Props {
  setView: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
}
interface FormInputs {
  username: string;
  password: string;
}
const Login = ({ setView }: Props) => {
  const { control, handleSubmit } = useForm();
  const { loginUser } = useActions();
  const onSubmit: SubmitHandler<FormInputs> = data => {
    loginUser(data);
  };
  return (
    <S.Container>
      <Header small />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Login Details</S.Title>
        <S.Row>
          <Input
            id='username'
            label='Username'
            defaultValue=''
            control={control}
          />
        </S.Row>
        <S.Row>
          <Input
            id='password'
            label='Password'
            defaultValue=''
            control={control}
          />
        </S.Row>

        <S.FormButton variant='contained' color='primary' type='submit'>
          Login
        </S.FormButton>
      </S.Form>
      <S.Text $center>
        Need an account?{' '}
        <S.Anchor onClick={() => setView('signup')}>Signup</S.Anchor>
      </S.Text>
    </S.Container>
  );
};

export default Login;
