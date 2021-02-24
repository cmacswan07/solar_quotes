import React from 'react';
import { Col, Row, Card, CardBody, CardTitle, CardHeader, FormGroup, Label, Button, Input, Form, UncontrolledAlert } from "reactstrap";
import { withRouter } from 'react-router-dom';
import api from 'api';
const utils = require('Utils');

class DesignCard extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <Form>
            <CardHeader>Design</CardHeader>
            <CardBody>
              
            </CardBody>
          </Form>
        </Card>
      </div>
    );
  }
}

export default DesignCard;