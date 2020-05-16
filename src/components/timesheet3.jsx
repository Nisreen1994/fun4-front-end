import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import EditDataRegistration from "../components/EditDataRegistrationModel";
import AddDataRegistration from "../components/AddDataRegistrationModel";
import AddNewProject from "../components/AddNewProject";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
class Data3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      addModalShow: false,
      editModalShow: false,
      addModelProjectShow: false,
      show: false,
      timesheet: [],
      timesheetId: "",
      anchorEl: null,
    };
  }
  getTimesheet() {
    fetch("http://localhost:8080/account/1/timesheet", { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ timesheet: result });
      })
      .catch((err) => console.error(this.props.url, err.toString()));
  }
  getData() {
    //var id = 3;
    //console.log(id);
    const url =
      "http://localhost:8080/timesheet/" + this.state.timesheetId + "/data";
    fetch(url, { method: "GET" })
      .then((reponse) => reponse.json())
      .then((result) => {
        this.setState({ data: result });
      });
  }

  componentDidMount() {
    this.getData();
    this.getTimesheet();
  }
  componentDidUpdate() {
    this.getData();
    this.getTimesheet();
  }

  deletRow(id) {
    if (window.confirm("Are you sure?")) {
      fetch("http://localhost:8080/timesheet/3/data/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    }
  }

  render() {
    const {
      data,
      id,
      activity,
      date,
      startTime,
      endTime,
      description,
      show,
    } = this.state;
    const { anchorEl } = this.state;
    var addModalClose = () => this.setState({ addModalShow: false });
    var editModalClose = () => this.setState({ editModalShow: false });
    var addModalProjectClose = () =>
      this.setState({ addModelProjectShow: false });

    const { timesheet } = this.state;
    const handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    return (
      <div>
        <div>
          <div>
            <Button
              variant="primary"
              onClick={() => this.setState({ addModelProjectShow: true })}
            >
              Add Project
            </Button>
            <AddNewProject
              show={this.state.addModelProjectShow}
              onHide={addModalProjectClose}
            />

            <Button
              className="float-right"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Projects Menu
            </Button>

            <div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {timesheet.map((project) => (
                  <MenuItem
                    id={project.id}
                    onClick={
                      ({ handleClose },
                      (event) => {
                        this.setState({ timesheetId: event.target.id });
                        console.log(event.target.id);
                      })
                    }
                  >
                    {project.project}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </div>

        <div>
          <div>
            <Table className="mt-4" striped bordered hover size="sm">
              <thead>
                <ButtonToolbar>
                  <Button
                    variant="primary"
                    onClick={() => this.setState({ addModalShow: true })}
                  >
                    Add
                  </Button>
                  <AddDataRegistration
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                  />
                </ButtonToolbar>
              </thead>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Activity</th>
                  <th>Date</th>
                  <th>Start-time</th>
                  <th>End-time</th>
                  <th>Description</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.activity}</td>
                    <td>{item.date}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                    <td>{item.description}</td>
                    <td>
                      <ButtonToolbar>
                        <Button
                          className="mr-2"
                          variant="info"
                          onClick={() =>
                            this.setState({
                              editModalShow: true,
                              id: item.id,
                              activity: item.activity,
                              date: item.date,
                              startTime: item.startTime,
                              endTime: item.endTime,
                              description: item.description,
                            })
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          className="mr-2"
                          variant="danger"
                          onClick={() => this.deletRow(item.id)}
                        >
                          Delete
                        </Button>
                        <EditDataRegistration
                          show={this.state.editModalShow}
                          onHide={editModalClose}
                          id={id}
                          activity={activity}
                          date={date}
                          startTime={startTime}
                          endTime={endTime}
                          description={description}
                        />
                      </ButtonToolbar>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Data3;
