import React, { Component } from "react";
import "../App.css";
import "../bootstrap.min.css";
import { Alert } from "react-bootstrap";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      staffMember: false,
      email: "",
      password: "",
      checkEmail: false,
      data: [],
    };
  }

  submitHndeler(event) {
    let url = "http://localhost:8080/account/";
    var data = this.state;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      if (result.ok === true) {
        alert("you can now login");
      } else alert("you are alredy regestierd");
      console.log(result);
    });

    event.preventDefault();
  }

  /*handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked });*/
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.submitHndeler.bind(this)}>
            <h3>Sign up</h3>
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                value={this.state.firstName}
                name="firstName"
                className="form-control"
                placeholder="First name"
                onChange={(data) => {
                  this.setState({ firstName: data.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                value={this.state.lastName}
                name="lastName"
                className="form-control"
                placeholder="Last name"
                onChange={(data) => {
                  this.setState({ lastName: data.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                checked={this.state.staffMember}
                name="staffMember"
                onChange={(data) => {
                  this.setState({ staffMember: data.target.checked });
                }}
              />
              <label>Staffmember!?</label>
            </div>
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
            <button id="signup" type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
