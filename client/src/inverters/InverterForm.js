import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button, Row, UncontrolledAlert } from "reactstrap";
import { postInverter, putInverter, deleteInverter } from './inverter-api';

class InverterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inverter: {
        invertermake: (this.props.inverter ? this.props.inverter.invertermake : ''),
        invertermodel: (this.props.inverter ? this.props.inverter.invertermodel : ''),
        watts: (this.props.inverter ? this.props.inverter.watts : ''),
        output: (this.props.inverter ? this.props.inverter.output : ''),
        breaker: (this.props.inverter ? this.props.inverter.breaker : ''),
        input: (this.props.inverter ? this.props.inverter.input : ''),
        invertertype: (this.props.inverter ? this.props.inverter.invertertype : 'optimizer'),
        successEdited: false
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var currentInverter = this.state.inverter;
    currentInverter[name] = value;
    this.setState({
      inverter: currentInverter
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.requestType == "post") {
      postInverter(this.state.inverter)
      .then((response) => {
        this.props.history.push(`/inverters/${response.rows[0].inverter_id}`);
      })
      .catch(() => {
        this.props.history.push('/inverters');
      });
    }
    if (this.props.requestType == "put") {
      putInverter(this.state.inverter, this.props.id)
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
    deleteInverter(this.props.id)
    .then((response) => {
      this.props.history.push('/inverters');
    });
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
            <strong>Success!</strong> Inverter successfully updated
          </span>
        </UncontrolledAlert>
      }
      <Form onSubmit={this.handleSubmit}>
        <Card className="m-auto shadow">
          <CardHeader>Inverter Information</CardHeader>
          <CardBody>
          <p>Basic Inverter information.</p>
            <Row>
            <Col lg="6">
            <FormGroup>
              <Label>Make</Label>
              <Input 
                type="text"
                name="invertermake"
                placeholder={ this.props.inverter ? this.props.inverter.invertermake : "Make" }
                defaultValue={ this.props.inverter ? this.props.inverter.invertermake : "" }
                onChange={ this.handleInputChange }
              />
            </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <Label>Model</Label>
                <Input 
                  type="text"
                  name="invertermodel"
                  placeholder={ this.props.inverter ? this.props.inverter.invertermodel : "Model" }
                  defaultValue={ this.props.inverter ? this.props.inverter.invertermodel : "" } 
                  onChange={ this.handleInputChange }
                />
              </FormGroup>
            </Col>
            </Row>
            <Row>
              <Col lg="3">
                <FormGroup>
                  <Label>Watts</Label>
                  <Input 
                    type="number"
                    name="watts"
                    placeholder={ this.props.inverter ? this.props.inverter.watts : "Watts" }
                    defaultValue={ this.props.inverter ? this.props.inverter.watts : "" }
                    onChange={ this.handleInputChange }
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label>Max AC Output</Label>
                  <Input 
                    type="number" 
                    name="output"
                    step=".001"
                    placeholder={ this.props.inverter ? this.props.inverter.output : "Output" }
                    defaultValue={ this.props.inverter ? this.props.inverter.output : "" }
                    onChange={ this.handleInputChange }
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label>Preferred Breaker</Label>
                  <Input 
                    type="number" 
                    name="breaker"
                    step=".001"
                    placeholder={ this.props.inverter ? this.props.inverter.breaker : "Breaker" }
                    defaultValue={ this.props.inverter ? this.props.inverter.breaker : "" }
                    onChange={ this.handleInputChange }
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label>Max Input</Label>
                  <Input 
                    type="number" 
                    name="input"
                    step=".001"
                    placeholder={ this.props.inverter ? this.props.inverter.input : "Input" }
                    defaultValue={ this.props.inverter ? this.props.inverter.input: "" }
                    onChange={ this.handleInputChange }
                  />
                </FormGroup>
              </Col>              
            </Row>
            <Row>
              <Col lg="3">
                <FormGroup>
                  <Label>Inverter Type</Label>
                  <Input defaultValue={this.state.inverter.invertertype == "micro-inverter" ? "micro-inverter" : "optimizer"} onChange={ this.handleInputChange } type="select" name="invertertype">
                    <option value="optimizer">Optimizer</option>
                    <option value="micro-inverter">Micro-Inverter</option>
                  </Input>
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
                <Button className="float-right shadow w-100 mt-3" color="success" type="submit">Submit</Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </div>
  );
  }
}

export default withRouter(InverterForm);
