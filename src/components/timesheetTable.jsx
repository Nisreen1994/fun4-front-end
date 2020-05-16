import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import EditDataRegistration from "../components/EditDataRegistrationModel";
import AddDataRegistration from "../components/AddDataRegistrationModel";

class Data2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      addModalShow: false,
      editModalShow: false,

      //show: false,
    };
  }
  getData() {
    var id = this.props.timesheetID;
    //var id = 3;

    const url = "http://localhost:8080/timesheet/" + 3 + "/data";
    fetch(url, { method: "GET" })
      .then((reponse) => reponse.json())
      .then((result) => {
        this.setState({ data: result });
        console.log(result);
        console.log(id);
      });
  }

  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
    this.getData();
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
      showDataProject,
    } = this.state;
    var addModalClose = () => this.setState({ addModalShow: false });
    var editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div {...this.props}>
        <div>
          <div>
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
          </div>
          <div>
            <Table className="mt-4" striped bordered hover size="sm">
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

export default Data2;
