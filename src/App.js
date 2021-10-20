import React, { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./components/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  // const [user, setUser] = useState();
  console.log(user);
  return !user ? (
    <Login />
  ) : (
    <div className="app">
      <div className="app__body">
        <Router>
          <Switch>
            <Sidebar />
          </Switch>
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
