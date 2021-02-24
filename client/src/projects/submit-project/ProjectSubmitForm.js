import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button, Row } from "reactstrap";
import { postProject } from '../project-api';

class ProjectSubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      state: '',
      zip: 0,
      lastmodified: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    postProject(this.state).then((res) => this.props.history.push(`/projects/${res}`));
  }

  render() {
  return (
    <div>
      <Card className="m-auto shadow">
        <CardHeader>Project Information</CardHeader>
        <CardBody>
        <p>Basic information about the home, homeowner, etc.</p>
          <Form onSubmit={this.handleSubmit}>
            <Row>
            <Col lg="6">
            <FormGroup>
              <Label>First Name</Label>
              <Input required name="firstname" type="text" placeholder="First" onChange={this.handleInputChange} />
            </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <Label>Last Name</Label>
                <Input required name="lastname" type="text" placeholder="Last" onChange={this.handleInputChange} />
              </FormGroup>
            </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Street Address</Label>
                  <Input required name="street" type="text" placeholder="Street Address" onChange={this.handleInputChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <FormGroup>
                  <Label>City</Label>
                  <Input required name="city" type="text" placeholder="City" onChange={this.handleInputChange} />
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <Label>State</Label>
                  <Input required name="state" type="text" placeholder="State" onChange={this.handleInputChange} />
                </FormGroup>
              </Col>
              <Col lg="4">
                <FormGroup>
                  <Label>Zip</Label>
                  <Input required name="zip" type="number" onChange={this.handleInputChange} />
                </FormGroup>
              </Col>
            </Row>
            <Button className="float-right w-50 mt-3" color="success" type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
  }
}

export default withRouter(ProjectSubmitForm);
