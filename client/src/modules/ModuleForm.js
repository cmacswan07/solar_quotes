import React from "react";
import { withRouter } from "react-router-dom";
import { UncontrolledAlert } from "reactstrap";
import { Col, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button, Row } from "reactstrap";
import { postModule, putModule, deleteModule } from './module-api';

class ModuleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      module: {
        modulemake: (this.props.module ? this.props.module.modulemake : ''),
        modulemodel: (this.props.module ? this.props.module.modulemodel : ''),
        watts: (this.props.module ? this.props.module.watts : ''),
        vmp: (this.props.module ? this.props.module.vmp : ''),
        voc: (this.props.module ? this.props.module.voc : ''),
        isc: (this.props.module ? this.props.module.isc : ''),
        imp: (this.props.module ? this.props.module.imp : ''),
      },
      successEdited: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var currentModule = this.state.module;
    currentModule[name] = value;
    
    this.setState({ 
      module: currentModule
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.requestType == "post") {
      postModule(this.state.module)
      .then((response) => {
        this.props.history.push(`/modules/${response.rows[0].module_id}`);
      })
      .catch(() => {
        this.props.history.push('/modules');
      });
    }
    if (this.props.requestType == "put") {
      putModule(this.state.module, this.props.id)
      .then(() => {
        this.setState({
          successEdited: true
        });
      })
      .catch((err) => console.log(err));
    }
  }

  handleDelete(event) {
    event.preventDefault();
    deleteModule(this.props.id)
    .then(() => this.props.history.push('/modules'));
  }

  render() {
    return (
      <div>
        {
          this.state.successEdited == true &&
          <UncontrolledAlert color="success" fade={true}>
          <span className="alert-inner--icon">
            <i className="ni ni-like-2" />
          </span>
          <span className="alert-inner--text ml-1">
            <strong>Success!</strong> Module successfully updated
          </span>
          </UncontrolledAlert>
        }
        <Form onSubmit={this.handleSubmit}>
          <Card className="m-auto shadow">
            <CardHeader>Module Information</CardHeader>
            <CardBody>
            <p>Basic module information.</p>
              <Row>
                <Col lg="4">
                <FormGroup>
                  <Label>Module Make</Label>
                  <Input 
                    type="text" 
                    placeholder={ this.props.module ? this.props.module.modulemake : "Make" }
                    defaultValue={ this.props.module ? this.props.module.modulemake : "" }
                    name="modulemake"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <Label>Module Model</Label>
                    <Input 
                      type="text" 
                      placeholder={ this.props.module ? this.props.module.modulemodel : "Model" } 
                      defaultValue={ this.props.module ? this.props.module.modulemodel : "" }
                      name="modulemodel"
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <Label>Module Watts</Label>
                    <Input 
                      type="number" 
                      placeholder={ this.props.module ? this.props.module.watts : "Watts" }
                      defaultValue={ this.props.module ? this.props.module.watts : "" }
                      name="watts"
                      onChange={this.handleInputChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="3">
                  <FormGroup>
                    <Label>Module Voc</Label>
                    <Input 
                      type="number"
                      placeholder={ this.props.module ? this.props.module.voc : "Voc" }
                      defaultValue={ this.props.module ? this.props.module.voc : "" }
                      name="voc"
                      onChange={this.handleInputChange}
                      step=".001" 
                      required
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup>
                    <Label>Module Vmp</Label>
                    <Input 
                      type="number"
                      placeholder={ this.props.module ? this.props.module.vmp : "Vmp" }
                      defaultValue={ this.props.module ? this.props.module.vmp : "" }
                      name="vmp"
                      onChange={this.handleInputChange}
                      step=".001"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup>
                    <Label>Module Isc</Label>
                    <Input 
                      type="number" 
                      placeholder={ this.props.module ? this.props.module.isc : "Isc" }
                      defaultValue={ this.props.module ? this.props.module.isc : "" }
                      name="isc"
                      onChange={this.handleInputChange}
                      step=".001"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col lg="3">
                  <FormGroup>
                    <Label>Module Imp</Label>
                    <Input 
                      type="number"
                      placeholder={ this.props.module ? this.props.module.imp : "Imp" }
                      defaultValue={ this.props.module ? this.props.module.imp : "" }
                      name="imp"
                      onChange={this.handleInputChange}
                      step=".001"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  {
                  this.props.requestType == "put" &&
                  <Button onClick={this.handleDelete} className="float-left shadow w-100 mt-3" color="danger" type="button">Delete</Button>
                  }
                </Col>
                <Col>
                  <Button className="float-right shadow w-100 mt-3" color="success" type="submit">Save</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </div>
    );
  }
}

export default withRouter(ModuleForm);
