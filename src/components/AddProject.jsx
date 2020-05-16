import React, { Component } from "react";
import { Button } from "react-bootstrap";
class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: "",
      data: [],
    };
  }

  handelSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:8080/account/1/timesheet";
    var data = this.state;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {});
    alert("Data is saved");
  }
  render() {
    return (
      <form onSubmit={this.handelSubmit.bind(this)}>
        <div className="form-group">
          <label>Project</label>
          <input
            type="text"
            value={this.state.project}
            name="project"
            required
            placeholder="Project"
            onChange={(data) => {
              this.setState({ project: data.target.value });
            }}
          />
        </div>

        <Button type="submit">Add</Button>
      </form>
    );
  }
}

export default AddProject;
