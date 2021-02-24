import React from "react";

// reactstrap components
import { Col, Row, Card, CardBody, CardHeader, FormGroup, Label, Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { getProjectById, getProjectDesigns } from '../project-api';

class ProjectId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      project: {
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        state: '',
        zip: 0,
        status: 0,
        lastmodified: '',
      },
      designs: [],
      dataLoaded: false,
      editing: false
    }
    this.getProjectRequest = this.getProjectRequest.bind(this);
  }

  componentDidMount() {
    this.getProjectRequest();
  }

  getProjectRequest() {
    getProjectById(this.state.id)
    .then((res) => {
      this.setState({
        project: res,
        dataLoaded: true
      });
      return getProjectDesigns(this.state.id)
    })
    .then((res) => {
      this.setState({
        designs: res
      });
    })
    .catch(() => this.props.history.push('/projects'))
  }

  get designRows() {
    return this.state.designs.map((design) => 
      <tr key={design.design_id}>
        <th scope="row">
          <Link tag="a" to={`/projects/${this.state.id}/designs/${design.design_id}`}>{ design.name }</Link>
        </th>
        <td>{ design.module_qty }</td>
        <td>{ design.module }</td>
        <td>{ design.inverter_qty }</td>
        <td>{ design.inverter }</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <Col lg="12" className="mx-auto">
          <div className="text-white mb-3">
            <h1 className="text-white">
              { this.state.project.firstname + ' ' + this.state.project.lastname }
              <Button tag={Link} to="/projects" type="button" className="btn-icon ml-2" color="success">
                <span className="btn-inner--icon">
                  <i className="ni ni-bold-left"></i>
                </span>
                <span className="btn-inner--text">BACK</span>
              </Button>
            </h1>
            <p>Here you'll find information for the { this.state.project.firstname + ' ' + this.state.project.lastname } project.</p>
          </div>
            <Row>
              <Col lg="4">
                <ProjectCard id={this.state.id} project={this.state.project} getProjectRequest={this.getProjectRequest} />
              </Col>
              <Col lg="8">
                <Card className="m-auto shadow">
                  <CardHeader>
                    <span>Designs</span>
                    <Button tag={Link} to={`/projects/${this.state.id}/designs/submit-design`} className="ml-2" type="button" color="success">
                      <span className="btn-inner--icon">
                        <i className="ni ni-fat-add"></i>
                      </span>
                      <span className="btn-inner--text">ADD</span>
                    </Button>
                  </CardHeader>
                  <CardBody>
                    {this.state.designs.length < 1 && 
                    <p>Here is your list of designs for this project.</p>
                    }
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">
                            <a href="#">
                              Name
                            </a>
                          </th>
                          <th scope="col">
                            <a href="#">
                              Module Qty.
                            </a>
                          </th>
                          <th scope="col">
                            <a href="#">
                              Module
                            </a>
                          </th>
                          <th scope="col">
                            <a href="#">
                              Inverter Qty.
                            </a>
                          </th>
                          <th scope="col">
                            <a href="#">
                              Inverter
                            </a>
                          </th>
                        </tr>
                        { this.designRows }
                      </thead>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
        </Col>
      </div>
    );
  }
}

export default ProjectId;
