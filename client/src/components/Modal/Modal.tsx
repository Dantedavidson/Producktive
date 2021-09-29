import React, { useRef } from 'react';
import { useOutsideClick } from '../../hooks';
import { Close as _Close } from '@material-ui/icons';
import Styled from 'styled-components';

type Styles = {
  corners: 'sharp' | 'rounded';
  width: number;
  height: number | 'auto';
  position: 'fixed' | 'absolute';
  positionTop: number;
  color?: 'grey';
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
  position: ${props => props.$styles.position};
  top: ${props => `${props.$styles.positionTop}rem`};
  left:${props => (props.$styles.position === 'fixed' ? '50%' : '')};
  transform:${props =>
    props.$styles.position === 'fixed' ? 'translateX(-50%)' : ''};
  background-color:${props =>
    props.$styles.color === 'grey' ? 'rgb(230,230,230)' : 'white'} ;
  width: ${props => `${props.$styles.width}rem`};
  max-width: 90vw;
  height:${props =>
    props.$styles.height === 'auto' ? 'auto' : `${props.$styles.height}vh`};
  padding: 0 0.5rem;
  border: 1px solid rgba(173, 173, 173, 0.8);
  border-radius:${props => props.$styles.corners === 'rounded' && '5px'};
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  z-index:5;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgb(210, 210, 210);

  &::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    background: inherit;
  }
  &::-webkit-scrollbar-track {
    border-right: 8px solid rgb(240, 240, 240);
    margin: 0.5rem 0;
  }
  &::-webkit-scrollbar-thumb {
    border-right: 8px solid rgb(210, 210, 210);
    margin: 0.5rem 0;
  } 
}
`;

const Close = Styled(_Close)`
  position: absolute;
  top: 2px;
  right: 2px;
  cursor: pointer;
  color: rgba(69, 68, 68, 0.8);
  font-size: 1.2rem;
  `;

const Modal = ({ children, active, handler, styles }: Props) => {
  const ref = useRef<any>(null);
  useOutsideClick(ref, handler);
  return (
    <StyledModal
      ref={ref}
      $display={active}
      $styles={styles}
      className='no-drag'
    >
      <Close onClick={() => handler(false)} />
      {children}
    </StyledModal>
  );
};

export default Modal;
