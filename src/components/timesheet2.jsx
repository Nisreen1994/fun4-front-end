import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import EditDataRegistration from "../components/EditDataRegistrationModel";
import AddDataRegistration from "../components/AddDataRegistrationModel";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import EditProject from "./EditProject";
// TEST trigger Jenkins by github
const useStyles = makeStyles(
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 2,
    },
    title: {
      flexGrow: 1,
      color: "White",
    },
    NavBar: {
      backgroundColor: "#c62828",
      color: "White",
    },
  })
);
class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      addModalShow: false,
      deleteModal: false,
      editModalShow: false,
      addModelProjectShow: false,
      editModelProjectShow: false,
      show: false,
      timesheet: [],
      timesheetId: "",
      anchorEl: null,
      projectName: [],
      projectTextValue: "",
      deleteid: "",
    };
    this.getTimesheet = this.getTimesheet.bind(this);
  }

  getTimesheet() {
    var id = localStorage.getItem("accountId");
    if (id === null || id == 1) {
      var url = "http://localhost:8080/account/1/timesheet";

      //localStorage.setItem("accountId", 1);
      //id = localStorage.getItem("accountId");
    } else {
      id = localStorage.getItem("accountId");
      var url = "http://localhost:8080/account/" + id + "/timesheet";
    }
    console.log("id=", id);
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ timesheet: result });
        for (var i = 0; i < result.length; i++) {
          this.state.projectName.push({
            id: result[i].id,
            project: result[i].project,
          });
        }
      })
      .catch((err) => console.error(this.props.url, err.toString()));
  }

  getData() {
    const url =
      "http://localhost:8080/timesheet/" + this.state.timesheetId + "/data";
    fetch(url, { method: "GET" })
      .then((reponse) => reponse.json())
      .then((result) => {
        this.setState({ data: result });
      });
  }
  getProjectTextValue() {
    var id = this.state.timesheetId;
    if (id === "") {
      this.setState({
        projectTextValue: "project name",
      });
    } else {
      var index = this.state.projectName.findIndex((item) => {
        return item.id == id;
      });

      this.setState({
        projectTextValue: this.state.projectName[index].project,
      });
    }
  }
  updateProjectTextValue(project) {
    this.setState({ projectTextValue: project });
  }

  componentDidMount() {
    this.getData();
    this.getTimesheet();
    this.getProjectTextValue();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.timesheetId !== prevState.timesheetId ||
      this.state.addModalShow !== prevState.addModalShow ||
      this.state.checkUpdate !== prevProps.checkUpdate ||
      this.state.editModalShow !== prevState.editModalShow
    ) {
      this.getData();
      this.getProjectTextValue();
    }
    if (
      this.state.editModelProjectShow !== prevState.editModelProjectShow ||
      this.props.projectTextValue !== prevProps.projectTextValue
    ) {
      this.getTimesheet();
      this.getProjectTextValue();
      console.log(this.state.projectTextValue);
    }
    if (this.state.deleteModal !== prevState.deleteModal) {
      console.log("hu", this.state.deleteModal);
      console.log("pre", prevState.deleteModal);
      this.getData();
      this.getProjectTextValue();
    }
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
      project,
      updateProject,

      show,
    } = this.state;
    const { anchorEl } = this.state;
    var addModalClose = () => this.setState({ addModalShow: false });
    var editModalClose = () => this.setState({ editModalShow: false });
    var addModalProjectClose = () =>
      this.setState({ addModelProjectShow: false });
    var editModalProjectClose = () =>
      this.setState({ editModelProjectShow: false });

    const { timesheet } = this.state;
    const { projectTextValue } = this.state;
    const handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };
    const { deleteModal } = this.state;

    return (
      <div>
        <div>
          <div>
            <div>
              <div>
                <form noValidate autoComplete="off">
                  <TextField
                    id="standard-basic"
                    label="Project Name"
                    value={this.state.projectTextValue}
                  />
                  <Button
                    className="mr-2"
                    variant="success"
                    onClick={() =>
                      this.setState({
                        editModelProjectShow: true,
                        project: this.state.projectTextValue,
                        updateProject: this.updateProjectTextValue.bind(this),
                      })
                    }
                  >
                    Edit
                  </Button>
                  <EditProject
                    show={this.state.editModelProjectShow}
                    onHide={editModalProjectClose}
                    timesheetId={this.state.timesheetId}
                    project={project}
                    updateProject={updateProject}
                  />
                </form>

                <Button
                  id="select-project"
                  className="float-right"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) => {
                    handleClick(event);
                  }}
                >
                  Select Projects
                </Button>
              </div>
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
                      onClick={(event) => {
                        this.setState({ timesheetId: event.target.id });
                        console.log(event.target.id);
                        this.setState({ anchorEl: null });
                      }}
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
                      id="Add-Data"
                      variant="primary"
                      onClick={() => this.setState({ addModalShow: true })}
                    >
                      Add
                    </Button>
                    <AddDataRegistration
                      show={this.state.addModalShow}
                      onHide={addModalClose}
                      timesheetId={this.state.timesheetId}
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
                            id="edit-data"
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
                          <Button
                            id="Delete-data"
                            className="mr-2"
                            variant="danger"
                            onClick={() => {
                              this.deletRow(item.id);
                              this.setState(
                                { deleteModal: !deleteModal },
                                () => {
                                  this.getData();
                                }
                              );
                            }}
                          >
                            Delete
                          </Button>
                        </ButtonToolbar>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Data;
