import React from 'react';
import { Close } from '@material-ui/icons';
import Styled from 'styled-components';

type Styles = {
  corners: 'sharp' | 'rounded';
  width: number;
  positionTop: number;
};

interface Props {
  children: JSX.Element | JSX.Element[];
  handler: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  styles: Styles;
}

const StyledModal = Styled.div<{ $display: boolean; $styles: Styles }>`
&& {
  display: ${props => (props.$display ? '' : 'none')};
  position: absolute;
  top: ${props => `${props.$styles.positionTop}rem`};
  left:0;
  background-color: white;
  width: ${props => `${props.$styles.width}rem`};
  padding: 0 0.5rem;
  border: 1px solid rgba(173, 173, 173, 0.8);
  border-radius:${props => props.$styles.corners === 'rounded' && '5px'};
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  z-index:2;

  svg {
    position: absolute;
    top: 2px;
    right: 2px;
    cursor: pointer;
    color: rgba(69, 68, 68, 0.8);
    font-size: 1.2rem;
  }
}
`;

const Modal = ({ children, active, handler, styles }: Props) => {
  return (
    <StyledModal $display={active} $styles={styles}>
      <Close onClick={() => handler(false)} />
      {children}
    </StyledModal>
  );
};

export default Modal;
