import React, { useEffect } from 'react';
import { AppBar } from '@material-ui/core';
import { palette, breakpoints } from 'src/styles';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const StyledAppBar = styled(AppBar)`
  display: flex;
  justify-content: center;
  align-content: center;
  background: ${palette.black} !important;
  height: 70px;
  @media only screen and (${breakpoints.md}) {
    height: 117px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 23px;
    margin-left: 19px;
    @media only screen and (${breakpoints.md}) {
      font-size: 48px;
      line-height: 62px;
      margin-left: 8vw;
    }
  }
`;

const Header: React.FC = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 300,
      disable: 'mobile',
      easing: 'ease-out',
    });
  }, []);
  return (
    <StyledAppBar elevation={0}>
      <div data-aos='fade-right' data-aos-delay='400'>
        <h1>Ile zniczy zakupić?</h1>
      </div>
    </StyledAppBar>
  );
};
export default Header;
