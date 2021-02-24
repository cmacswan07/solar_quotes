import React from "react";
import { Card, CardBody, CardHeader, CardTitle, FormGroup, Input, Button, Label } from "reactstrap";

class ModulesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modulemake: '',
      modulemodel: ''
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
          <CardHeader><h3>Module Search</h3></CardHeader>
            <CardBody>
              <FormGroup>
                <Label>Module Make</Label>
                <Input
                  name="modulemake"
                  placeholder="Module Make"
                  type="text"
                  className="mb-1"
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Module Model</Label>
                <Input
                  name="modulemodel"
                  placeholder="Module Model"
                  type="text"
                  className="mb-1"
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Module Power</Label>
                <Input
                  name="watts"
                  placeholder="Module Power"
                  type="number"
                  className="mb-1"
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <Button onClick={() => this.props.searchModules(this.state)} type="button" color="success" className="shadow w-50">SEARCH</Button>
            </CardBody>
        </Card>
      </div>
    );
  }
}

export default ModulesSearch;
