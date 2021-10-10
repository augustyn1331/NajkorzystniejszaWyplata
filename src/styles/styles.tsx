import { Theme, makeStyles } from '@material-ui/core/styles';
import palette from './palette';

const globalStyles = makeStyles<Theme>((theme: Theme) => ({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: '0',
      padding: '0',
      fontFamily: 'Poppins, sans-serif',
    },
    html: {
      fontSize: '16px',
    },
    body: { overflowX: 'hidden', backgroundColor: 'white' },
    'h1, h2': {
      color: palette.black,
    },
    'h1, h2, h4': {
      fontWeight: 600,
    },
    'h1, h2, h3': {
      textAlign: 'center',
    },
    'h3, h4, h6': {
      letterSpacing: '0.01rem',
    },
  },
}));

export default globalStyles;
