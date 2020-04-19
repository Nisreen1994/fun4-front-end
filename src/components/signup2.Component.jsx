import React, { Component } from "react";
import "../App.css";
import "../bootstrap.min.css";
import { Alert } from "react-bootstrap";
class Signup2 extends Component {
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
  getAccount() {
    fetch("http://localhost:8080/account/")
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: result });
        console.log(this.state.data);
      })
      .catch((err) => console.error(this.props.url, err.toString()));
  }
  checkAccount(props) {
    var listData = this.state.data; // Het is niet veilig dat je client applicatie alle emails krijgt.
    const email = this.state.email;
    var counter_email = 0;
    for (counter_email = 0; counter_email < listData.length; counter_email++) {
      var account = listData[counter_email];
      if (account.email === email) {
        return true;
      }
    }
  }

  submitHndeler(event) {
    // TODO
    if (!this.checkAccount()) {
      let url = "http://localhost:8080/account/";
      var data = this.state;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {});
    } else if (this.checkAccount()) {
      console.log("email is exist you can log in");
      return (
        <Alert variant="info">
          This email is exist you can
          <Alert.Link href="#">Login</Alert.Link>
        </Alert>
      );
    }

    event.preventDefault();
  }
  componentDidMount() {
    this.getAccount();
  }
  /*handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked });*/
  render() {
    return (
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
    );
  }
}

export default Signup2;
