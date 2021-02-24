import React from "react";
import { Col, Row, Card, CardBody, CardHeader, FormGroup, Label, Button } from "reactstrap";
import { withRouter, Link } from 'react-router-dom';
import InverterForm from "../InverterForm";
import { getInverterById } from '../inverter-api';

class InverterId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      inverter: {
        invertermake: '',
        invertermodel: '',
        watts: 0,
        output: 0,
        breaker: 0,
        input: 0,
        inverterType: ''
      },
      dataLoaded: false,
      editing: false
    }
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.getInverterRequest = this.getInverterRequest.bind(this);
  }

  componentDidMount() {
    this.getInverterRequest();
  }

  getInverterRequest() {
    getInverterById(this.state.id)
    .then((res) => {
      this.setState({
        inverter: res,
        dataLoaded: true
      });
    })
    .catch(() => this.props.history.push('/inverters'));
  }

  handleEditToggle() {
    if (this.state.editing) {
      this.getInverterRequest();
    }
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    return (
      <div>
        <Col lg="8" className="mx-auto">
          <div className="text-white">
            <h1 className="text-white">
              { this.state.inverter.invertermake + ' ' + this.state.inverter.invertermodel }
              <Button tag={Link} to="/inverters" type="button" className="btn-icon ml-2" color="success">
                <span className="btn-inner--icon">
                  <i className="ni ni-bold-left"></i>
                </span>
                <span className="btn-inner--text">BACK</span>
              </Button>
            </h1>
            <Row>
              <Col lg="8">
                Here you'll find information for the { this.state.inverter.invertermake + ' ' + this.state.inverter.invertermodel }
              </Col>
              <Col className="mb-2 text-right">
                <span className="align-middle ml-2">
                  <Button color="warning" className="btn-icon" onClick={this.handleEditToggle}>
                    <span className="btn-inner--icon mr-1">
                      <i className="ni ni-ruler-pencil"></i>
                    </span>
                    <span className="btn-inner--text">EDIT</span>
                  </Button>
                </span>
              </Col>
            </Row>
          </div>
          { !this.state.editing && 
            <Card className="m-auto shadow">
              <CardHeader>
                <span>
                  Inverter Information
                </span>
              </CardHeader>
              <CardBody>
              <p>Basic inverter information.</p>
                <Row>
                  <Col lg="4">
                  <FormGroup>
                    <Label>Inverter Make</Label>
                    <p>{ this.state.inverter.invertermake }</p>
                  </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>Inverter Model</Label>
                      <p>{ this.state.inverter.invertermodel }</p>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label>Inverter Watts</Label>
                      <p>{ this.state.inverter.watts }</p>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="3">
                    <FormGroup>
                      <Label>Inverter Output</Label>
                      <p>{ this.state.inverter.output }</p>
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label>Breaker Size</Label>
                      <p>{ this.state.inverter.breaker }</p>
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label>Max Input</Label>
                      <p>{ this.state.inverter.input }</p>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="3">
                    <FormGroup>
                      <Label>Inverter Type</Label>
                      <p>{ this.state.inverter.invertertype }</p>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          }
          {
            this.state.dataLoaded && this.state.editing
            ? <InverterForm id={this.state.id} requestType="put" inverter={ this.state.inverter }/>
            : <div></div>
          }
        </Col>
      </div>
    );
  }
}

export default withRouter(InverterId);
