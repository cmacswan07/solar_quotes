import React from "react";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import ModuleForm from "../ModuleForm";

class ModuleSubmit extends React.Component {
  render() {
  return (
    <div>
      <Col lg="8" className="mx-auto">
        <div className="text-white">
          <h1 className="text-white">
            Add Module
            <Button tag={Link} to="/modules" type="button" className="btn-icon ml-2" color="success">
              <span className="btn-inner--icon">
                <i className="ni ni-bold-left"></i>
              </span>
              <span className="btn-inner--text">BACK</span>
            </Button>
          </h1>
          <p>Use this form to add a Module to your Module Library.</p>
        </div>
        <ModuleForm requestType="post" />
      </Col>
    </div>
  );
  }
}

export default ModuleSubmit;
