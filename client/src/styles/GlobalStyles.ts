import { createGlobalStyle } from 'styled-components';
import Background from '../images/background.jpg';

export default createGlobalStyle`


*{
    box-sizing:border-box;
    margin:0;
    padding:0;
    scroll-behavior: smooth;
}
body{
    padding: 0 1rem;
    background-image: url(${Background});
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    min-height: 100vh;
}
button {
    display: inline-block;
    border: none;
    text-decoration: none;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
}

textarea {
    font-family:  inherit;
    font-size: inherit;
    color:inherit;
    :focus-visible {
      outline: none;
    }
}

*{
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
}
`;
