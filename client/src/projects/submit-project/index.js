import React from "react";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import ProjectSubmitForm from "./ProjectSubmitForm";

class ProjectSubmit extends React.Component {
  render() {
    return (
      <div>
        <Col lg="8" className="mx-auto">
          <div className="text-white">
            <h1 className="text-white">
              Add Project
              <Button tag={Link} to="/projects" type="button" className="btn-icon ml-2" color="success">
                <span className="btn-inner--icon">
                  <i className="ni ni-bold-left"></i>
                </span>
                <span className="btn-inner--text">BACK</span>
              </Button>
            </h1>
            <p>Use this form to add a new project and start a plan set.</p>
          </div>
          <ProjectSubmitForm />
        </Col>
      </div>
    );
  }
}

export default ProjectSubmit;
