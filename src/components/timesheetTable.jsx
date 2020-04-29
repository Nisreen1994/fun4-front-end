import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import EditDataRegistration from "../components/EditDataRegistrationModel";
import AddDataRegistration from "../components/AddDataRegistrationModel";
class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      addModalShow: false,
      editModalShow: false,
    };
  }
  getData() {
    var id = this.props.idOfTimesheet;
    console.log(id);
    const url = "http://localhost:8080/timesheet/3/data";
    fetch(url, { method: "GET" })
      .then((reponse) => reponse.json())
      .then((result) => {
        this.setState({ data: result });
      });
  }

  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
    this.getData();
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
    } = this.state;
    var addModalClose = () => this.setState({ addModalShow: false });
    var editModalClose = () => this.setState({ editModalShow: false });

    return (
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
    );
  }
}

export default Data;
