import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Route, Link, Switch } from "react-router-dom";
import { Button } from "react-bootstrap";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Data from "../components/timesheet2";
import AddProject from "../components/AddProject";
import DeleteProject from "../components/DeleteProject";

class NavbareTimesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesheet: [],
      anchorEl: null,
      timesheetId: "",
      showDataProject: false,
    };
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
        <AppBar position="static">
          <Toolbar>
            <Button href="/home" color="inherit">
              Personal schedule
            </Button>
            <Button href="/addProject" color="inherit">
              Add project
            </Button>
            <div>
              <div>
                <Button href="/deleteProject">Delete project</Button>

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
        </AppBar>
        <Switch>
          <Route path="/home">
            <Data />
          </Route>
          <Route path="/addProject">
            <AddProject />
          </Route>
          <Route path="/deleteProject">
            <DeleteProject />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default NavbareTimesheet;
