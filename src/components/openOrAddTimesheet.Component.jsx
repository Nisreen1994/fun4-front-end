import React, { Component } from "react";
class OpenOrAddTimesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesheet: [],
      projectName: [],
    };
    // this.getTimesheet = this.getTimesheet.bind(this);
  }
  getTimesheet() {
    fetch("http://localhost:8080/account/1/timesheet", { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ timesheet: result });
        for (var i = 0; i < this.state.timesheet.length; i++) {
          this.state.projectName.push(this.state.timesheet[i].project);
        }
        console.log(result);
        console.log(this.state.timesheet);
        console.log(this.state.projectName);
      })
      .catch((err) => console.error(this.props.url, err.toString()));
  }
  componentWillMount() {
    this.getTimesheet();
  }

  render() {
    //this.getTimesheet();
    var projects = [];
    for (var i = 0; i < this.state.projectName.length; i++) {
      projects.push(this.state.projectName[i]);
    }

    return (
      <div>
        {projects.map((project) => (
          <div>
            <button>{project}</button>
          </div>
        ))}
      </div>
    );
  }
}

export default OpenOrAddTimesheet;
