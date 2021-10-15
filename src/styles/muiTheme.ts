import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { plPL } from '@material-ui/core/locale';
import { palette } from 'src/styles/';

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        light: palette.white,
        main: palette.black,
      },
      secondary: {
        light: palette.white,
        main: palette.blue,
      },
    },
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      fontSize: 14,
    },
    overrides: {
      MuiButton: {
        startIcon: {
          marginRight: '4px',
        },
      },
      //overriding fontSize on the radio buttons
      MuiTypography: {
        body1: {
          fontSize: 14,
        },
      },
      //add category popup
      MuiDialog: {
        paper: {
          backgroundColor: 'rgba(0, 0, 0, .0) !important',
          marginLeft: '6px',
          marginRight: '8px',
          boxShadow: 'none',
        },
      },
      MuiDialogContent: {
        root: {
          padding: '0px',
        },
      },
      MuiDialogActions: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
  plPL
);

export default theme;
