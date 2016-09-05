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
import {cyan500} from 'material-ui/styles/colors';
injectTapEventPlugin();

// testing custom theme
// const customTheme = getMuiTheme({
//   palette: {
//     textColor: cyan500,
//   },
//   appBar: {
//     height: 80,
//   },
// });

// render(
//   <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
//     <Router routes={routes} history={browserHistory}/>
//   </MuiThemeProvider>
//   ,document.getElementById('react-root')
// )


render(
  <MuiThemeProvider >
    <Router routes={routes} history={browserHistory}/>
  </MuiThemeProvider>
  ,document.getElementById('react-root')
)
