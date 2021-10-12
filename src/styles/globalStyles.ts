import { createGlobalStyle } from 'styled-components';
import { palette } from './palette';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Roboto, DN Sans, sans-serif;
  }
  body{
    font-size:16px;
    background-color: ${palette.white};
  }
`;
