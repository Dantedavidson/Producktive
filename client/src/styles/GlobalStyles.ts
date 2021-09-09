import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`


*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}
body{
    padding: 0 1rem;
}
button {
    display: inline-block;
    border: none;
    text-decoration: none;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
}
`;
