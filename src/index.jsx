// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
// MUI realted 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';
import {cyan500, white, grey300, cyan700, fullBlack, grey400, pinkA200, grey100, grey500, darkBlack} from 'material-ui/styles/colors';
injectTapEventPlugin();

// testing custom theme
const customTheme = getMuiTheme({
  palette: {
    primary1Color: '#536D88',
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  }
});

render(
  <MuiThemeProvider muiTheme={customTheme} >
    <Router routes={routes} history={browserHistory}/>
  </MuiThemeProvider>
  ,document.getElementById('react-root')
)
