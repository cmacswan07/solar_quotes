import React from "react";
import { Link } from "react-router-dom"
import { Col, Row, Button } from "reactstrap";
import { getProjects, getProjectsSearch } from './project-api';
import { getUser } from 'auth-api';

// my components
import ProjectsTable from "./ProjectsTable";
import ProjectsSearch from "./ProjectsSearch";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      projects: []
    }
    this.searchProjects = this.searchProjects.bind(this);
  }

  componentDidMount() {
    getProjects().then((res) => { this.setState({ projects: res }); });
    // getUser().then((res) => { console.log(res) });
  }

  searchProjects(search) {
    getProjectsSearch(search).then((res) => { this.setState({ projects: res }); });
  }

  render() {
    return (
      <div>
        <Col lg="8" className="text-white">
          <h1 className="text-white">Projects</h1>
          <p>Here are all of your projects. View and Edit existing projects here, or create a new one.</p>
        </Col>
        <Row>
          <Col>
            <ProjectsSearch searchProjects={this.searchProjects} />
          </Col>
          <Col lg="8">
            <ProjectsTable projects={this.state.projects} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Projects;
