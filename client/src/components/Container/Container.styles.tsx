import styled from 'styled-components';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ScrollContainer from 'react-indiana-drag-scroll';

export const Logout = styled(LogoutRoundedIcon)`
  && {
    margin-left: 0.3rem;
    font-size: 1.2rem;
    margin-bottom: 0.1rem;
  }
`;

interface ScrollProps {
  className?: string;
  children: React.ReactNode;
}

const Scroll = ({ children, className }: ScrollProps) => (
  <ScrollContainer
    className={className}
    ignoreElements='.no-drag'
    hideScrollbars={false}
  >
    {children}
  </ScrollContainer>
);

export const Container = styled(Scroll)`
  overflow-y: hidden;
  overflow-x: auto;
  padding: 1rem;
  width: 100vw;
  height: calc(100vh - 8rem);

  /* For Chrome, Edge, and Safari */

  &::-webkit-scrollbar {
    background: inherit;
  }
  &::-webkit-scrollbar-track {
    border-bottom: 8px solid rgb(240, 240, 240);
    margin-bottom: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    border-bottom: 8px solid rgb(210, 210, 210);
    margin-bottom: 0.5rem;
  }
`;

export const Text = styled.p`
  font-family: ${props => props.theme.fontMain};
  font-size: 1.1rem;
`;

export const LogoutWrap = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

export const FlexWrap = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
`;
