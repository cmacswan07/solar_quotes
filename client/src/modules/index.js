import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import ModulesTable from "./ModulesTable";
import ModulesSearch from "./ModulesSearch";
import { getModules, getModulesSearch } from './module-api';

class Modules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: []
    }
    this.searchModules = this.searchModules.bind(this);
  }

  componentDidMount() {
    getModules().then((res) => this.setState({ modules: res}))
  }

  searchModules(search) {
    getModulesSearch(search).then((res) => this.setState({ modules: res}));
  }

  render() {
    return (
      <div>
        <div className="text-white">
          <h1 className="text-white">Modules</h1>
          <p>Here's your library of Modules. Select a module to edit or view the Module information, or add a new Module.</p>
        </div>
        <Row>
          <Col>
            <ModulesSearch searchModules={this.searchModules} />
          </Col>
          <Col lg="8">
            <ModulesTable modules={this.state.modules} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Modules;
