import * as S from './Form.styles';
import { Input } from './FormComponents';
import { Header } from '../index';
import { useForm } from 'react-hook-form';

interface Props {
  setView: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
}
const Login = ({ setView }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <S.Container>
      <Header />
      <S.Form>
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

        <S.FormButton variant='contained' color='primary'>
          Login
        </S.FormButton>
      </S.Form>
      <S.Text $center>
        Need an account?{' '}
        <S.Anchor onClick={() => setView('signup')}>Signup</S.Anchor>
      </S.Text>
      <S.Text $center>OR</S.Text>
      <S.FormButton variant='contained' color='primary'>
        Guest Login
      </S.FormButton>
    </S.Container>
  );
};

export default Login;
