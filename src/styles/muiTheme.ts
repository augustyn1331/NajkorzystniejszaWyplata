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
      MuiTypography: {
        body1: {
          fontSize: 14,
        },
      },
    },
  },
  plPL
);

export default theme;
