import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import palette from 'src/styles/palette';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: '0px 16px 32px 16px !important',
    background: palette.white,
    [theme.breakpoints.down('md')]: {
      animation: 'fadein 0.2s ease-out',
      WebkitAnimation: 'fadein 0.2s ease-out',
    },
    [theme.breakpoints.up('md')]: {
      padding: '76px 16px 0px 16px !important',
      flexDirection: 'row',
    },
  },
  flexbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${classes.flexbox}`} id='Home'>
      <p>Hello world</p>
    </div>
  );
}
