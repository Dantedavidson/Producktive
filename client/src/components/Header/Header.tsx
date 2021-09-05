import * as S from './Header.styles';
import Logo from '../../images/producktive.svg';
const Header = () => {
  return (
    <S.Header>
      <S.Image src={Logo} />
    </S.Header>
  );
};
export default Header;
