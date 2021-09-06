import * as S from './Form.styles';
import { Input } from './FormComponents';
import { Header } from '../index';
import { useActions } from '../../hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().min(5).max(24).required('Username is required'),
  password: yup.string().min(5).max(24).required('Password is required'),
  passwordTwo: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

interface Props {
  setView: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
}

interface FormInputs {
  username: string;
  password: string;
  confirm: string;
}

const Signup = ({ setView }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signupUser } = useActions();
  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
    signupUser(data);
  };
  return (
    <S.Container>
      <Header />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Sign Up</S.Title>
        <S.Row>
          <Input
            id='username'
            label='Username'
            defaultValue=''
            error={errors.username}
            errorMessage={errors.username?.message}
            control={control}
          />
        </S.Row>
        <S.Row>
          <Input
            id='password'
            label='Password'
            defaultValue=''
            error={errors.password}
            errorMessage={errors.password?.message}
            control={control}
          />
        </S.Row>
        <S.Row>
          <Input
            id='passwordTwo'
            label='Confirm Password'
            defaultValue=''
            error={errors.passwordTwo}
            errorMessage={errors.passwordTwo?.message}
            control={control}
          />
        </S.Row>
        <S.FormButton variant='contained' color='primary' type='submit'>
          Sign Up
        </S.FormButton>
      </S.Form>
      <S.Text $center>
        <S.Anchor onClick={() => setView('login')}>Back</S.Anchor>
      </S.Text>
    </S.Container>
  );
};

export default Signup;
