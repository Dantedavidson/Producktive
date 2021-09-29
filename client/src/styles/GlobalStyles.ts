import { createGlobalStyle } from 'styled-components';
import Background from '../images/sitebackground.jpg';

export default createGlobalStyle`


*{
    box-sizing:border-box;
    margin:0;
    padding:0;
    //Remove text select
    /* -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;  */

}
body{
    background-image: url(${Background});
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    height:100vh;
    width:100%;
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

.smooth-dnd-container{
    min-height:5px;
}
 

 /* Smooth dnd placeholder styles */
 
 .column-drop-preview{
     background-color:rgba(51, 51, 51,0.1);
     border-radius: 5px;
     margin: 5px;
 }
 .card-drop-preview{
    background-color: rgba(150, 150, 200, 0.1);
    border: 1px dashed #abc;
    margin: 5px;
 }

 .card-ghost{
     transform: rotate(3deg);
 }

 



`;
