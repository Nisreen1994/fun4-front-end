import React, { Component } from "react";
class OpenOrAddTimesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesheet: [],
      projectName: [],
    };
  }
  getTimesheet() {
    fetch("http://localhost:8080/account/1/timesheet", { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ timesheet: result.project });
        console.log(result);
        console.log(this.state.timesheet);
      })
      .catch((err) => console.error(this.props.url, err.toString()));
  }

  componentDidMount() {
    this.getTimesheet();
  }

  render() {
    const { projects } = this.state;
    return (
      /*<div id="project">
        {projects.map((project) => (
          <div>
            <div key={project.project}> </div>
            <button>{project.project}</button>

            <div></div>
          </div>
        ))}
     
      </div>*/
      <button>hallo</button>
    );
  }
}

export default OpenOrAddTimesheet;
