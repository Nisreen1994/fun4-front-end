import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class DeleteProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesheet: [],
      timesheetId: "",
      anchorEl: null,
    };
  }
  getTimesheet() {
    var id = localStorage.getItem("accountId");
    if (id === null) {
      localStorage.setItem("accountId", 1);
      id = localStorage.getItem("accountId");
    } else {
      id = localStorage.getItem("accountId");
    }
    console.log("id=", id);
    fetch("http://localhost:8080/account/" + id + "/timesheet", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ timesheet: result });
      })
      .catch((err) => console.error(this.props.url, err.toString()));
  }
  componentDidMount() {
    this.getTimesheet();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.timesheetId !== prevState.timesheetId ||
      this.state.anchorEl !== prevState.anchorEl
    ) {
      this.getTimesheet();
    }
  }
  handelDeleteTimesheet(id) {
    this.setState({ timesheetId: id });
    if (window.confirm("Are you sure?")) {
      fetch("http://localhost:8080/account/1/timesheet/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    }
  }

  render() {
    const { timesheet } = this.state;
    const { showDataProject } = this.state;
    const { anchorEl } = this.state;
    const handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };
    return (
      <div>
        <Toolbar>
          <div>
            <div>
              <Button
                className="float-right"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Select project to delete
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
                          this.handelDeleteTimesheet(project.id);
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
        </Toolbar>
      </div>
    );
  }
}
export default DeleteProject;
