import React, {Component} from 'react';
import Topbar from "./topbar.jsx";
import WidgetMenu from "./widget_menu.jsx";
import Board from "./board.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <Topbar />
        <div className="row">
          <WidgetMenu />
          <Board />
        </div>
      </div>
    );
  }
}
export default App;
