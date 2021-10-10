import { keyframes, css } from 'styled-components';
import { breakpoints } from './breakpoints';

export const fadeInKeyframes = keyframes`
0% { opacity: 0; }
100% { opacity: 1; }
`;
export const fadeIn = css`
  animation: ${fadeInKeyframes} 0.3s ease-out;
  -webkit-animation: ${fadeInKeyframes} 0.3s ease-out;
  @media only screen and (${breakpoints.md}) {
    animation: undefined;
    -webkit-animation: undefined;
  }
`;
