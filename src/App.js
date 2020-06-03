import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import { Router, Switch, Route, Link, withRouter } from "react-router-dom";
import Login from "./components/login.Component";
import Signup from "./components/signup.Component";
import Signup2 from "./components/signup2.Component";
import Data from "./components/timesheet2";
import AddProject from "./components/AddProject";
import NavbareTimesheet from "./components/NavbareTimesheet";
import { createBrowserHistory } from "history";
import { PlacesAirportShuttle } from "material-ui/svg-icons";
import DeleteProject from "./components/DeleteProject";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import history from "./history";
const history = createBrowserHistory();

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
        <div></div>
        <div>
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route exact path="/sign-up" component={Signup} />
              <Route path="/sign-up/" component={Signup} />
              <Route path="/nav" component={NavbareTimesheet} />
              <Route path="/home">
                <Data />
              </Route>
              <Route path="/addProject">
                <AddProject />
              </Route>
              <Route path="/deleteProject">
                <DeleteProject />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
    /*<Router history={history}>
      <div>
        <NavbareTimesheet />
      </div>

      <Switch>
        <Route exact path="/">
          <Data />
        </Route>
        <Route path="/addProject">
          <AddProject />
        </Route>
        <Route path="/deleteProject">
          <DeleteProject />
        </Route>
      </Switch>
    </Router>*/
  );
}
export default App;
