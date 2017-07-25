import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiTheme from 'mui/muiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GameContainer from 'containers/game/GameContainer';
import logo from 'logo.svg';
import './App.css';

// material-ui requirement
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Video Poker</h2>
        </div>
        <div className="App-body">
          <MuiThemeProvider muiTheme={MuiTheme}>
            <GameContainer />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default App;
