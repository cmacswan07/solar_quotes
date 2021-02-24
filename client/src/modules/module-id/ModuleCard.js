import React from "react";
import { Col, Row, Card, CardBody, CardHeader, FormGroup, Label } from "reactstrap";

class ModuleCard extends React.Component {
  render() {
    return (
      <Card className="m-auto shadow">
        <CardHeader>
          <span>
            Module Information
          </span>
        </CardHeader>
        <CardBody>
        <p>Basic module information.</p>
          <Row>
            <Col lg="4">
            <FormGroup>
              <Label>Module Make</Label>
              <p>{ this.props.module.modulemake }</p>
            </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup>
                <Label>Module Model</Label>
                <p>{ this.props.module.modulemodel }</p>
              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup>
                <Label>Module Watts</Label>
                <p>{ this.props.module.watts }</p>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="3">
              <FormGroup>
                <Label>Module Voc</Label>
                <p>{ this.props.module.voc }</p>
              </FormGroup>
            </Col>
            <Col lg="3">
              <FormGroup>
                <Label>Module Vmp</Label>
                <p>{ this.props.module.vmp }</p>
              </FormGroup>
            </Col>
            <Col lg="3">
              <FormGroup>
                <Label>Module Isc</Label>
                <p>{ this.props.module.isc }</p>
              </FormGroup>
            </Col>
            <Col lg="3">
              <FormGroup>
                <Label>Module Imp</Label>
                <p>{ this.props.module.isc }</p>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default ModuleCard;
