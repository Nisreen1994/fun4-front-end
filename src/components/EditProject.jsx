import React, { Component } from "react";

import { Modal, Button, Row, Col, Form } from "react-bootstrap";
class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project,
      timesheetId: "",
    };
  }
  handelSubmit(event) {
    event.preventDefault();
    if (this.props.timesheetId === "") {
      alert("Select a project");
    } else {
      const url = "http://localhost:8080/account/1/timesheet/";
      var data = this.state;
      fetch(url + this.props.timesheetId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {});
      alert("Data is saved");
    }
  }
  updateStateProjectTextValue() {
    this.props.updateProject(this.state.project);
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
            Update PrjectName
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handelSubmit.bind(this)}>
                  <Form.Group controlId="project">
                    <Form.Label>Project name</Form.Label>
                    <Form.Control
                      type="text"
                      name="project"
                      required
                      defaultValue={this.props.project}
                      onChange={(data) => {
                        this.setState({ project: data.target.value });
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="submit">
                    <Button type="submit">Update</Button>
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

export default EditProject;
