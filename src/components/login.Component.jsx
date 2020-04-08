import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Signup from "./signup.Component";

class Login extends Component {
  state = {};
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/action_page.php">
        <div>
          <h3>Login</h3>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="Email"
              className="form-control"
              placeholder="Email address"
            />
          </div>
          <div className="form=group">
            <label>Password</label>
            <input
              type="Password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customcheck1"
              />
              <label className="custom-control-label" htmlFor="customcheck1">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <p className="forgot-password text-right">
              forgot <a href="#">password?</a>
            </p>
          </div>
          <div>
            <p className="forgot-password text-right">
              No account yet
              <Link className="nav-link" to={"/sign-up/"}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
