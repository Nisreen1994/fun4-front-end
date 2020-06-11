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
    var id = localStorage.getItem("accountId");
    if (id === null || id == 1) {
      var url = "http://localhost:8080/account/1/timesheet";
    } else {
      var url = "http://localhost:8080/account/" + id + "/timesheet";
    }
    console.log("id=", id);
    event.preventDefault();

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
            id="add-project-text"
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

        <Button id="add" type="submit">
          Add
        </Button>
      </form>
    );
  }
}

export default AddProject;
