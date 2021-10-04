import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { TextareaAutosize } from '@material-ui/core';

export const Container = styled.div`
  border: 1px solid grey;
  background-color: white;
  border-radius: 5px;
  max-width: 23rem;
  margin: 10vh auto 0 auto;
  padding: 1rem;
`;

export const FormButton = styled(Button)`
  && {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;
export const Form = styled.form``;

export const Title = styled.h3`
  margin-bottom: 1rem;
  font-family: 'Balsamiq Sans';
`;

interface TextProps {
  $center?: boolean;
}
export const Text = styled.p<TextProps>`
  margin-bottom: 1rem;
  text-align: ${({ $center }) => $center && 'center'};
  font-family: 'Balsamiq Sans';
`;

export const Anchor = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

export const Row = styled.div`
  margin-bottom: 1.5rem;
`;

export const Input = styled(TextareaAutosize)`
  && {
    width: 100%;
    -webkit-touch-callout: text;
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
`;
