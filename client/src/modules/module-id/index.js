import React from "react";
import ModuleForm from "../ModuleForm";
import ModuleCard from "./ModuleCard";
import { getModuleById } from '../module-api';
import { Col, Row, Button } from "reactstrap";
import { withRouter, Link } from 'react-router-dom';

class ModuleId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      module: {
        modulemake: '',
        modulemodel: '',
        watts: 0,
        voc: 0,
        vmp: 0,
        isc: 0,
        imp: 0,
      },
      dataLoaded: false,
      editing: false
    }
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.getModuleRequest = this.getModuleRequest.bind(this);
  }

  componentDidMount() {
    this.getModuleRequest();
  }

  getModuleRequest() {
    getModuleById(this.state.id)
    .then((res) => {
      this.setState({
        module: res,
        dataLoaded: true
      });
    })
    .catch(() => this.props.history.push('/modules'));
  }

  handleEditToggle() {
    if (this.state.editing) {
      this.getModuleRequest();
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
              { this.state.module.modulemake + ' ' + this.state.module.modulemodel }
              <Button tag={Link} to="/modules" type="button" className="btn-icon ml-2" color="success">
                <span className="btn-inner--icon">
                  <i className="ni ni-bold-left"></i>
                </span>
                <span className="btn-inner--text">BACK</span>
              </Button>
            </h1>
            <Row>
              <Col lg="8">
                Here you'll find information for the { this.state.module.modulemake + ' ' + this.state.module.modulemodel }
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
          <div>
            <ModuleCard module={this.state.module} />
          </div>
          }
          {
            this.state.dataLoaded && this.state.editing
            ? <ModuleForm id={this.state.id} requestType="put" module = { this.state.module }/>
            : <div></div>
          }
        </Col>
      </div>
    );
  }
}

export default withRouter(ModuleId);
