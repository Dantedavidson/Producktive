import * as S from './Header.styles';
import Logo from '../../images/producktive.svg';

interface Props {
  small?: boolean;
}

const Header = ({ small }: Props) => {
  return (
    <S.Header small={small}>
      <S.Image src={Logo} alt='Productive Logo' />
    </S.Header>
  );
};
export default Header;
