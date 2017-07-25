import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { 
  cyan500,
  grey400,
  pinkA200,
  grey100,
  grey500,
  grey600,
  darkBlack,
  white,
  grey300,
  fullBlack
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#CE2027',
    primary2Color: pinkA200,
    primary3Color: grey400,
    accent1Color: grey100,
    accent2Color: grey300,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: '#fff',
    canvasColor: white,
    borderColor: grey600,
    pickerHeaderColor: cyan500,
    shadowColor: fullBlack,
  }
});

export default muiTheme;
