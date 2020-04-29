import React, { Component } from "react";

class OpenOrAddTimesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesheet: [],
      projectName: [],
      timesheetId: "",
    };
    // this.getTimesheet = this.getTimesheet.bind(this);
  }
  getTimesheet() {
    fetch("http://localhost:8080/account/1/timesheet", { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ timesheet: result });

        console.log(result);
        console.log(this.state.timesheet);
        console.log(this.state.projectName);
      })
      .catch((err) => console.error(this.props.url, err.toString()));
  }
  //givId(event) {
  //var id = event.target.id;
  // this.setState({ timesheetId: id });
  // console.log(this.state.timesheetId);
  // }
  componentWillMount() {
    this.getTimesheet();
    //this.givId();
  }

  render() {
    //this.getTimesheet();
    // var projects = [];
    // for (var i = 0; i < this.state.projectName.length; i++) {
    // projects.push(this.state.projectName[i]);
    // }
    const { timesheet } = this.state;

    return (
      <div>
        {timesheet.map((project) => (
          <div>
            <button
              id={project.id}
              onClick={(event) =>
                this.setState({ timesheetId: event.target.id })
              }
            >
              {project.project}
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default OpenOrAddTimesheet;
