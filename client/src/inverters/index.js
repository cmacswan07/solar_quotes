import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import InvertersTable from "./InvertersTable";
import InvertersSearch from "./InvertersSearch";
import { getInverters, getInvertersSearch } from './inverter-api';

class Inverters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inverters: []
    }
    this.searchInverters = this.searchInverters.bind(this);
  }

  componentDidMount() {
    getInverters()
    .then((response) => {
      this.setState({ inverters: response });
    });
  }

  searchInverters(search) {
    getInvertersSearch(search)
    .then((res) => {
      this.setState({ inverters: res});
    });
  }

  render() {
    return (
      <div>
        <div className="text-white">
          <h1 className="text-white">Inverters</h1>
          <p>Here's your library of Inverters. Select an Inverter to view or edit it's information, or add a new Inverter to your library.</p>
        </div>
        <Row>
          <Col>
            <InvertersSearch searchInverters={this.searchInverters} />
          </Col>
          <Col lg="8">
            <InvertersTable inverters={this.state.inverters} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Inverters;
