import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

const palette = {
  primary: indigo,
  secondary: pink,
  error: red
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: palette.primary[300],
      main: palette.primary[500],
      dark: palette.primary[700],
      contrastText: 3,
    },
    secondary: {
      light: palette.secondary.A200,
      main: palette.secondary.A400,
      dark: palette.secondary.A700,
      contrastText: 3,
    },
    error: {
      light: palette.error[300],
      main: palette.error[500],
      dark: palette.error[700],
      contrastText: 3,
    },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  backgroundColor: '#FFFFFF',
  fontFamily: 'Muli, sans-serif',
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        background: 'linear-gradient(45deg, #07ad23 30%, #03f1affc 90%)',
        borderRadius: 26,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
    MuiFormLabel: {
      root: {
        color: "black",
        fontSize: '16px',
        margin: '0px !important',
        fontWeight: 450,
        "&$focused": {
          color: "orange",
        }
      },
    },
  },
});
export default theme;
