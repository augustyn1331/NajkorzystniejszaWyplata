import React from 'react';
import { AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';
import { Link as LinkScroll } from 'react-scroll';
import logo from 'src/assets/logo.png';
import useViewport from 'src/hooks/useViewport';
import palette from 'src/styles/palette';
import MenuIcon from '@material-ui/icons/Menu';

const headersData = [
  {
    label: 'HOME',
    href: 'Home',
  },
];

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  //Containers
  toolbar: {
    justifyContent: 'space-between',
    minHeight: '54px',
  },
  appbar: {
    [theme.breakpoints.down('md')]: {
      animation: 'fadein 0.2s ease-out',
      WebkitAnimation: 'fadein 0.2s ease-out',
    },
    background: palette.black,
  },
  drawer: {
    background: 'linear-gradient(#f7f9fb,#fff,#fff,#fff,#fff)',
  },
  drawerWrapper: {
    padding: '20px 30px',
    listStyleType: 'none !important',
    flexDirection: 'column',
  },
  //Logo img and logo link
  navLogo: {
    height: '30px',
    [theme.breakpoints.up('md')]: {
      height: '41px',
    },
  },
  navLogoLink: {
    marginLeft: '16px',
    height: '54px',
    cursor: 'pointer',
    [theme.breakpoints.up('lg')]: {
      marginLeft: '100px',
    },
  },
  //Menu button
  menuButton: {
    padding: '0px 8px',
    height: '54px',
  },
  menuIcon: {
    height: 46,
    width: 46,
    fill: 'rgba(255,255,255,0.95)',
  },
  //Menu links
  navUl: {
    flexDirection: 'row',
    marginTop: '0px',
    listStyleType: 'none !important',
    [theme.breakpoints.up('lg')]: {
      marginRight: '64px',
    },
  },
  navList: {
    height: '76px',
    margin: '0rem 1rem',
  },
  navLink: {
    position: 'relative',
    height: '100%',
    fontSize: '1.7rem',
    fontWeight: 300,
    letterSpacing: '0.9px',
    padding: '0px 2px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: palette.black,
    [theme.breakpoints.up('md')]: {
      color: palette.white,
    },
    //underline shape
    '&::before': {
      content: "''",
      position: 'absolute',
      left: '0',
      right: '0',
      bottom: '0',
      height: '3px',
      transition: 'transform 200ms ease-out',
      transform: 'scaleX(0)',
      transformOrigin: '100% 50%',
      backgroundColor: palette.primary,
    },
    //underline animation on active link
    '&.active::before': {
      transform: 'scaleX(1)',
      transformOrigin: '0% 50%',
    },
  },
  flexbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Navbar: React.FC = () => {
  // styles (css in js)
  const {
    toolbar,
    appbar,
    drawer,
    drawerWrapper,
    navList,
    navLogo,
    navLogoLink,
    navLink,
    navUl,
    menuIcon,
    menuButton,
    flexbox,
  } = useStyles();

  /* useState to control drawer being opened*/
  const [drawerOpen, setDrawerOpen] = useState(false);
  /*Open and Close drawer */
  const handleDrawerState = () => setDrawerOpen((currState) => !currState);
  // Get current window width custom hook
  const width = useViewport();
  const mobileView = width < 960;

  /* Display desktop Navbar */
  const navbarDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {myLogo()}
        <ul className={`${navUl} ${flexbox}`}>{getDesktopLinks()}</ul>
      </Toolbar>
    );
  };

  /* Display mobile Navbar */
  const navbarMobile = () => {
    return (
      <Toolbar className={toolbar}>
        {myLogo()}
        <IconButton className={menuButton} onClick={handleDrawerState}>
          <MenuIcon className={menuIcon} />
        </IconButton>
        <Drawer
          classes={{ paper: drawer }}
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerState,
          }}
        >
          <ul className={`${drawerWrapper} ${flexbox}`}>{getMobileLinks()}</ul>
        </Drawer>
      </Toolbar>
    );
  };

  /* Mapping drawer links */
  const getMobileLinks = () => {
    return headersData.map(({ label, href }) => {
      return (
        <li key={label} className={navList}>
          <LinkScroll
            id={href + 'Link'}
            to={href}
            smooth={true}
            duration={500}
            spy={true}
            offset={-53} //different offset for mobile nav
            exact='true'
            className={`${navLink} ${flexbox}`}
            onClick={handleDrawerState}
          >
            {label}
          </LinkScroll>
        </li>
      );
    });
  };

  /* Mapping desktop links */
  const getDesktopLinks = () => {
    return headersData.map(({ label, href }) => {
      return (
        <li key={label} className={navList}>
          <LinkScroll
            id={href + 'Link'}
            to={href}
            smooth={true}
            duration={500}
            spy={true}
            offset={-76}
            exact='true'
            className={`${navLink} ${flexbox}`}
          >
            {label}
          </LinkScroll>
        </li>
      );
    });
  };

  //Logo button
  const myLogo = () => {
    return (
      <LinkScroll
        to={'Home'}
        smooth={true}
        duration={500}
        spy={true}
        offset={-76}
        exact='true'
        className={`${navLogoLink} ${flexbox}`}
      >
        <img className={navLogo} src={logo} alt='car' />
      </LinkScroll>
    );
  };

  return (
    <div data-aos='fade-down' data-aos-delay='100'>
      <AppBar elevation={mobileView ? 1 : 0} className={appbar}>
        {mobileView ? navbarMobile() : navbarDesktop()}
      </AppBar>
    </div>
  );
};
export default Navbar;
