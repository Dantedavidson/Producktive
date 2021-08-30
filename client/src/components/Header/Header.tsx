import { _Header, Img } from './Header.styles';
import Logo from '../../images/producktive.svg';
const Header = () => {
  return (
    <_Header>
      <Img src={Logo} />
    </_Header>
  );
};
export default Header;
