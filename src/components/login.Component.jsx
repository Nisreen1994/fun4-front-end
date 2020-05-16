import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Data from "../components/timesheet2";
import AddProject from "../components/AddProject";
import DeleteProject from "../components/DeleteProject";
import EditProject from "../components/EditProject";
import Signup from "./signup2.Component";

class Login extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      data: [],
      accountId: "",
      show: false,
    };
    this.submitHndeler = this.submitHndeler.bind(this);
  }
  submitHndeler(event) {
    let url = "http://localhost:8080/account/login";
    var data = this.state;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === null) {
          alert("fout");
        } else {
          
             //console.log(result.id);
          this.setState({ show: true });
          this.setState({ accountId: result.id });
          //console.log(this.state.accountId);
          window.location.replace("/nav");
          
        
         
        }
      });

    event.preventDefault();
  }

  render() {
    const { show } = this.state;
    var { accountId } = this.state;
    return (
      <div>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form
              action="/action_page.php"
              onSubmit={this.submitHndeler.bind(this)}
            >
              <div>
                <h3>Login</h3>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    id="email"
                    type="Email"
                    value={this.state.email}
                    name="email"
                    className="form-control"
                    placeholder="Email address"
                    onChange={(data) => {
                      this.setState({ email: data.target.value });
                    }}
                  />
                </div>
                <div className="form=group">
                  <label>Password</label>
                  <input
                    type="Password"
                    value={this.state.password}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(data) => {
                      this.setState({ password: data.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customcheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customcheck1"
                    >
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
          </div>
        </div>
        <div>
          {show && <Data accountIdFromLogIn={accountId} /> &&
            console.log({ accountId })}
        </div>
      </div>
    );
  }
}

export default Login;
