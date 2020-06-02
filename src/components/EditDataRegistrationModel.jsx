import React, { Component } from "react";

import { Modal, Button, Row, Col, Form } from "react-bootstrap";
class EditDataRegistrationModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      activity: this.props.activity,
      date: this.props.date,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      description: this.props.description,
      data: [],
    };
  }
  handelSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:8080/timesheet/3/data/";
    var data = this.state;
    fetch(url + this.props.id, {
      method: "PUT",
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
            Update Activity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handelSubmit.bind(this)}>
                  <Form.Group controlId="id">
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.props.id}
                      name="id"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group controlId="activity">
                    <Form.Label>Activity</Form.Label>
                    <Form.Control
                      type="text"
                      name="activity"
                      required
                      defaultValue={this.props.activity}
                      onChange={(data) => {
                        this.setState({ activity: data.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="text"
                      name="date"
                      required
                      defaultValue={this.props.date}
                      onChange={(data) => {
                        this.setState({ date: data.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="startTime">
                    <Form.Label>Start-time</Form.Label>
                    <Form.Control
                      type="text"
                      name="startTime"
                      required
                      defaultValue={this.props.startTime}
                      onChange={(data) => {
                        this.setState({ startTime: data.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="endTime">
                    <Form.Label>End-time</Form.Label>
                    <Form.Control
                      type="text"
                      name="endTime"
                      required
                      defaultValue={this.props.endTime}
                      onChange={(data) => {
                        this.setState({ endTime: data.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      required
                      defaultValue={this.props.description}
                      onChange={(data) => {
                        this.setState({ description: data.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="submit">
                    <Button id="update-data" type="submit">
                      Update
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button id="close-edit" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditDataRegistrationModel;
