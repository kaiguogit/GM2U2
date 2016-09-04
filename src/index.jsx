// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
    <MuiThemeProvider>
      <Router routes={routes} history={browserHistory}/>
    </MuiThemeProvider>
    ,document.getElementById('react-root')
)
