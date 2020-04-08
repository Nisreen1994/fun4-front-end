import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login.Component";
import Signup from "./components/signup.Component";

function App() {
  return (
    <Router>
      <div className="App">
        <nav class="navbar navbar-expand-sm">
          <a class="navbar-brand">
            <img src="logoNav.png" alt="Logo"></img>
          </a>
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route exact path="/sign-up" component={Signup} />
              <Route path="/sign-up/" component={Signup} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
