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
  Button,
  Label
} from "reactstrap";

class InvertersSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invertermake: '',
      invertermodel: '',
      invertertype: ''
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
          <CardHeader><h3>Inverter Search</h3></CardHeader>
          <CardBody>
            <FormGroup>
              <Label>Inverter Make</Label>
              <Input
                  placeholder="Inverter Make"
                  name="invertermake"
                  type="text"
                  className="mb-1"
                  onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Inverter Model</Label>
              <Input
                placeholder="Inverter Model"
                name="invertermodel"
                type="text"
                className="mb-1"
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Inverter Type</Label>
              <Input type="select" name="invertertype" onChange={this.handleInputChange}>
                  <option value="">Any</option>
                  <option value="optimizer">Optimizer</option>
                  <option value="micro-inverter">Micro-Inverter</option>
              </Input>
            </FormGroup>
            <Button onClick={() => this.props.searchInverters(this.state)} color="success" className="shadow w-50">SEARCH</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default InvertersSearch;
