import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Button
} from "reactstrap";

class ProjectsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      street: '',
      city: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <Card className="shadow mb-2">
          <CardHeader><h3>Search Projects</h3></CardHeader>
          <CardBody>
            <FormGroup>
              <Label>First Name</Label>
              <Input
                  name="firstname"
                  placeholder="Name"
                  type="text"
                  onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input
                  name="lastname"
                  placeholder="Name"
                  type="text"
                  onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
                <Label>Address</Label>
                <Input
                    name="street"
                    placeholder="Address"
                    type="text"
                    onChange={this.handleInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label>City</Label>
                <Input
                    name="city"
                    placeholder="City"
                    type="text"
                    onChange={this.handleInputChange}
                />
            </FormGroup>
            <Button onClick={() => this.props.searchProjects(this.state)} color="success" className="shadow w-50">SEARCH</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ProjectsSearch;
