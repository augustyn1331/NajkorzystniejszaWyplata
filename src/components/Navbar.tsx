import React from 'react';
import { AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core';
import { useState } from 'react';
import { Link as LinkScroll } from 'react-scroll';
import logo from 'src/assets/logo.png';
import useViewport from 'src/hooks/useViewport';
import MenuIcon from '@material-ui/icons/Menu';
import { breakpoints, fadeIn, flexStyles, palette } from 'src/styles';
import styled from 'styled-components';

const headersData = [
  {
    label: 'HOME',
    href: 'Home',
  },
];

const StyledAppBar = styled(AppBar)`
  ${fadeIn}
  background: ${palette.black} !important;
`;
const StyledToolBar = styled(Toolbar)`
  justify-content: space-between;
  min-height: 54px;
`;
const StyledUl = styled.ul`
  ${flexStyles}
  list-style-type: none;
  flex-direction: column;
`;
const StyledUlMobile = styled(StyledUl)`
  padding: 20px 30px;
  flex-direction: column;
`;
const StyledUlDesktop = styled(StyledUl)`
  @media only screen and (${breakpoints.lg}) {
    margin-right: 64px;
  }
`;
const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    background-color: linear-gradient(#f7f9fb, #fff, #fff, #fff, #fff);
  }
`;
const StyledLogo = styled.img`
  height: 30px;
  @media only screen and (${breakpoints.md}) {
    height: 41px;
  }
`;
const StyledLogoWrapper = styled(LinkScroll)`
  ${flexStyles}
  margin-left:16px;
  height: 54px;
  cursor: pointer;
  @media only screen and (${breakpoints.md}) {
    margin-left: 100px;
  }
`;
const StyledMenuIcon = styled(MenuIcon)`
  height: 46px;
  width: 46px;
  fill: rgba(255, 255, 255, 0.95);
`;
const StyledIconButton = styled(IconButton)`
  height: 54px;
  padding: 0px 8px;
`;

const StyledLi = styled.li`
  height: 76px;
  margin: 0rem 1rem;
`;
const StyledNavLink = styled(LinkScroll)`
  ${flexStyles}
  position: relative;
  height: 100%;
  font-size: 1.7rem;
  font-weight: 300;
  letter-spacing: 0.9px;
  padding: 0px 2px;
  cursor: pointer;
  text-decoration: none;
  color: ${palette.black};
  @media only screen and (${breakpoints.md}) {
    color: ${palette.white};
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    transition: transform 200ms ease-out;
    transform: scaleX(0);
    transform-origin: 100% 50%;
    background-color: ${palette.primary};
  }
  &.active::before {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
`;
const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerState = () => setDrawerOpen((currState) => !currState);
  // Get current window width custom hook
  const width = useViewport();
  const mobileView = width < 960;

  /* Display desktop Navbar */
  const navbarDesktop = () => {
    return (
      <StyledToolBar>
        {myLogo()}
        <StyledUlDesktop>{getDesktopLinks()}</StyledUlDesktop>
      </StyledToolBar>
    );
  };

  /* Display mobile Navbar */
  const navbarMobile = () => {
    return (
      <StyledToolBar>
        {myLogo()}
        <StyledIconButton onClick={handleDrawerState}>
          <StyledMenuIcon />
        </StyledIconButton>
        <StyledDrawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerState,
          }}
        >
          <StyledUlMobile>{getMobileLinks()}</StyledUlMobile>
        </StyledDrawer>
      </StyledToolBar>
    );
  };

  /* Mapping drawer links */
  const getMobileLinks = () => {
    return headersData.map(({ label, href }) => {
      return (
        <StyledLi key={label}>
          <StyledNavLink
            id={href + 'Link'}
            to={href}
            smooth={true}
            duration={500}
            spy={true}
            offset={-53} //different offset for mobile nav
            exact='true'
            onClick={handleDrawerState}
          >
            {label}
          </StyledNavLink>
        </StyledLi>
      );
    });
  };

  /* Mapping desktop links */
  const getDesktopLinks = () => {
    return headersData.map(({ label, href }) => {
      return (
        <StyledLi key={label}>
          <StyledNavLink
            id={href + 'Link'}
            to={href}
            smooth={true}
            duration={500}
            spy={true}
            offset={-76}
            exact='true'
          >
            {label}
          </StyledNavLink>
        </StyledLi>
      );
    });
  };

  //Logo button
  const myLogo = () => {
    return (
      <StyledLogoWrapper
        to={'Home'}
        smooth={true}
        duration={500}
        spy={true}
        offset={-76}
        exact='true'
      >
        <StyledLogo src={logo} alt='car' />
      </StyledLogoWrapper>
    );
  };

  return (
    <div data-aos='fade-down' data-aos-delay='100'>
      <StyledAppBar elevation={mobileView ? 1 : 0}>
        {mobileView ? navbarMobile() : navbarDesktop()}
      </StyledAppBar>
    </div>
  );
};
export default Navbar;
