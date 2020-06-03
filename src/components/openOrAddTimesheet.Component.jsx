import React, { Component } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import { Switch } from "react-router";
import App from "../App";
import Data from "./timesheet2";

class OpenOrAddTimesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesheet: [],
      timesheetId: "",
      showDataProject: false,
    };
    // this.getTimesheet = this.getTimesheet.bind(this);
  }
  getTimesheet() {
    fetch("http://localhost:8080/account/1/timesheet", { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ timesheet: result });

        //console.log(result);
        //console.log(this.state.timesheet);
        //console.log(this.state.projectName);
      })
      .catch((err) => console.error(this.props.url, err.toString()));
  }

  componentWillMount() {
    this.getTimesheet();
  }

  render() {
    const { timesheet } = this.state;
    const { timesheetId } = this.state;
    const { showDataProject } = this.state;

    return (
      <div>
        {timesheet.map((project) => (
          <div key={project.id}>
            <ButtonToolbar>
              <Button
                id={project.id}
                onClick={(event) => {
                  this.setState({ timesheetId: event.target.id });
                  console.log(event.target.id);
                  this.props.history.push("/timesheet");
                  this.setState({
                    showDataProject: !this.state.showDataProject,
                  });
                  console.log(this.state.showDataProject);
                }}
              >
                {project.project}
              </Button>
            </ButtonToolbar>
          </div>
        ))}
      </div>
    );
  }
}

export default OpenOrAddTimesheet;
