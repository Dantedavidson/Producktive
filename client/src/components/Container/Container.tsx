import styled from 'styled-components';
import { AddButton, Lists } from '../index';
const ContainerStyled = styled.div`
  display: flex;
`;

const Container = () => {
  return (
    <ContainerStyled>
      <Lists />
      <AddButton btnType='list' />
    </ContainerStyled>
  );
};

export default Container;
