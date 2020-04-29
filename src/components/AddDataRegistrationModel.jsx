import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
class AddDataRegistrationModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      data: [],
    };
  }
  handelSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:8080/timesheet/3/data";
    var data = this.state;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {});
    alert("Data is saved");
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Activity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handelSubmit.bind(this)}>
                  <Form.Group controlId="activity">
                    <Form.Label>Activity</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.activity}
                      name="activity"
                      required
                      placeholder="Activity"
                      onChange={(data) => {
                        this.setState({ activity: data.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.date}
                      name="date"
                      required
                      placeholder="Date"
                      onChange={(data) => {
                        this.setState({ date: data.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="startTime">
                    <Form.Label>Start-time</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.startTime}
                      name="startTime"
                      required
                      placeholder="Start-time"
                      onChange={(data) => {
                        this.setState({ startTime: data.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="endTime">
                    <Form.Label>End-time</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.endTime}
                      name="endTime"
                      required
                      placeholder="End-time"
                      onChange={(data) => {
                        this.setState({ endTime: data.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.description}
                      name="description"
                      required
                      placeholder="Description"
                      onChange={(data) => {
                        this.setState({ description: data.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="submit">
                    <Button type="submit">Add</Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddDataRegistrationModel;
