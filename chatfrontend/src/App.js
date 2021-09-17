import Chat from "./chat/chat";
import Process from "./process/process";
import Home from "./home/home";
import Join from "./join/join";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import React from "react";
import io from "socket.io-client";

// Redux
import { Provider } from 'react-redux';
import store from './store';

const socket = io.connect('/');
function Appmain(props) {
  return (
    <React.Fragment>
      <div className="right">
        <Chat
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />
      </div>
      <div className="left">
        <Process />
      </div>
    </React.Fragment>
  );
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Home socket={socket} />
            </Route>
            <Route path="/join" exact>
              <Join socket={socket} />
            </Route>
            <Route path="/chat/:roomname/:username" component={Appmain} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
