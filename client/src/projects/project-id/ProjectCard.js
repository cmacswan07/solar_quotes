import React from "react";
import { Col, Row, Card, Form, CardBody, CardHeader, FormGroup, Input, Label, Button, UncontrolledAlert } from "reactstrap";
import { withRouter } from "react-router-dom";
import api from 'api';
import moment from 'moment';
import { putProject, deleteProject } from '../project-api';
import { deleteModule } from "modules/module-api";

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      state: '',
      zip: 0,
      status: 0,
      lastmodified: '',
      dataLoaded: false,
      editing: false,
      successEdited: false
    }
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.project !== this.props.project) {
      this.setState({
        firstname: this.props.project.firstname,
        lastname: this.props.project.lastname,
        street: this.props.project.street,
        city: this.props.project.city,
        state: this.props.project.state,
        zip: this.props.project.zip,
        status: this.props.project.status
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleEditToggle() {
    if (this.state.editing) {
      putProject(this.state, this.props.id)
      .then(() => {
        this.setState({
          successEdited: true
        });
        this.props.getProjectRequest();
      });
    }
    this.setState({
      editing: !this.state.editing
    });
  }

  handleDelete(event) {
    event.preventDefault();
    deleteProject(this.props.id).then(() => this.props.history.push('/projects'));
  }

  render() {
    return (
      <div className="mb-3">
        {
          this.state.successEdited == true &&
          <UncontrolledAlert color="success" fade={true}>
          <span className="alert-inner--icon">
            <i className="ni ni-like-2" />
          </span>
          <span className="alert-inner--text ml-1">
            <strong>Success!</strong> Project successfully updated
          </span>
          </UncontrolledAlert>
        }
        <Card className="m-auto shadow">
            <CardHeader>
              <span>Site Information</span>
            </CardHeader>
            <CardBody>
              <Form>
                { !this.state.editing &&
                <div>
                  <Row>
                    <Col> 
                      <FormGroup>
                        <Label>Name</Label>
                        <p>{ this.props.project.firstname + ' ' + this.props.project.lastname }</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label>Address</Label>
                    <p>{ this.props.project.street }</p>
                    { this.state.editing && <Input type="text" name="street" />}
                  </FormGroup>
                  <FormGroup>
                    <Label>City, State, Zip</Label>
                    <p>{ this.props.project.city } { this.props.project.state }, { this.props.project.zip }</p>
                    { this.state.editing && <Input type="text" name="city" />}
                  </FormGroup>
                </div>
                }
                { this.state.editing &&
                  <div>
                    <FormGroup>
                      <Label>First</Label>
                      <Input type="text" placeholder="First" name="firstname" defaultValue={this.props.project.firstname} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label>Last</Label>
                      <Input type="text" placeholder="Last" name="lastname" defaultValue={this.props.project.lastname} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label>Street</Label>
                      <Input type="text" placeholder="Street" name="street" defaultValue={this.props.project.street} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label>City</Label>
                      <Input type="text" placeholder="Street" name="city" defaultValue={this.props.project.city} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label>State</Label>
                      <Input type="text" placeholder="State" name="state" defaultValue={this.props.project.state} onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label>Zip</Label>
                      <Input type="number" placeholder="Zip" name="zip" defaultValue={this.props.project.zip} onChange={this.handleInputChange} />
                    </FormGroup>
                  </div>
                }
              </Form>
              <Button type="button" color="warning" className="btn-icon" onClick={this.handleEditToggle}>
                <span className="btn-inner--icon mr-1">
                  <i className="ni ni-ruler-pencil"></i>
                </span>
                <span className="btn-inner--text">EDIT</span>
              </Button>
              <Button onClick={this.handleDelete} className="ml-2" type="button" color="danger">
                <span className="btn-inner--icon mr-1">
                  <i className="ni ni-fat-remove"></i>
                </span>
                <span className="btn-inner--text">DELETE</span>
              </Button>
            </CardBody>
        </Card>
      </div>
    );
  }
}

export default withRouter(ProjectCard);
