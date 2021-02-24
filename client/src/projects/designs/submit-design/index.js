import React from "react";

// reactstrap components
import { Col, Row, Button, Card, CardBody, CardTitle, CardHeader, Form, FormGroup, Label, Input } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { postDesign, getProjectModulesInverters } from "projects/designs/designs-api";

class DesignSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      zip: 0,
      modules: [],
      modulesMap: {},
      inverters: [],
      invertersMap: {},
      moduleMakes: [],
      inverterMakes: [],
      moduleModels: [],
      inverterModels: [],
      selectedModuleMake: '',
      selectedModuleModel: '',
      selectedInverterMake: '',
      selectedInverterModel: '',
      moduleQty: 0,
      inverterQty: 0,
      roofFraming: '2x4 @ 24" O.C.',
      roofMaterial: 'Comp. Shingle',
      panelUpgrade: false,
      mainPanel: 200,
      mainBreaker: 200,
      designName: '',
      inputs: {
        designName: '',
        moduleQty: 0,
        selectedModuleMake: '',
        selectedModuleModel: '',
        selectedInverterMake: '',
        selectedInverterModel: '',
        roofFraming: '2x4 @ 24" O.C.',
        roofMaterial: 'Comp. Shingle',
        panelUpgrade: false,
        mainPanel: 200,
        mainBreaker: 200
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputModuleMake = this.handleInputModuleMake.bind(this);
    this.handleInputInverterMake = this.handleInputInverterMake.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    postDesign(this.state.inputs, this.state.id)
    .then(() => this.props.history.push(`/projects/${this.state.id}`))
    .catch(() => { console.log('rejected'); });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var inputFields = this.state.inputs;
    inputFields[name] = value;
    this.setState({
      inputs: inputFields
    });
  }

  componentDidMount() {
    getProjectModulesInverters(this.state)
    .then((res) => {
      var inputFields = this.state.inputs;
      console.log(res);
      inputFields["selectedModuleMake"] = res.modules[0].modulemake;
      inputFields["selectedModuleModel"] = res.modules[0].modulemodel;
      inputFields["selectedInverterMake"] = res.inverters[0].invertermake;
      inputFields["selectedInverterModel"] = res.inverters[0].invertermodel;
      this.setState({
        firstname: res.project.firstname,
        lastname: res.project.lastname,
        street: res.project.street,
        city: res.project.city,
        zip: res.project.zip,
        modules: res.modules,
        modulesMap: res.modulesMap,
        moduleMakes: res.moduleMakes,
        moduleModels: res.moduleModels,
        inverters: res.inverters,
        invertersMap: res.invertersMap,
        inverterMakes: res.inverterMakes,
        inverterModels: res.inverterModels,
        inputs: inputFields
      });
    })
    .catch(() => this.props.history.push('/projects'));
  }

  handleInputModuleMake(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var inputs = this.state.inputs;
    var moduleModels = this.state.modulesMap[value];
    inputs[name] = value;
    inputs["selectedModuleModel"] = moduleModels[0];
    this.setState({
      inputs: inputs,
      moduleModels: moduleModels
    });
  }

  handleInputInverterMake(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var inputs = this.state.inputs;
    var inverterModels = this.state.invertersMap[value];
    inputs[name] = value;
    inputs["selectedInverterModel"] = inverterModels[0];
    this.setState({
      inputs: inputs,
      inverterModels: inverterModels
    });
  }

  get moduleMakeOptions() {
    if (this.state.moduleMakes.length > 0) {
      return this.state.moduleMakes.map((item, i) => 
        <option key={i} value={item}>{ item }</option>
      );
    } else {
      return <option>No modules defined!</option>
    }
  }

  get inverterMakeOptions() {
    if (this.state.inverterMakes.length > 0) {
      return this.state.inverterMakes.map((item, i) =>
        <option key={i} value={item}>{ item }</option>
      );
    } else {
      return <option>No inverters defined!</option>
    }
  }

  get moduleModelOptions() {
    if (this.state.moduleModels) {
      return this.state.moduleModels.map((item, i) =>
        <option key={i}>{ item }</option>
      );
    } else {
      return <option>No modules defined!</option>
    }
  }

  get inverterModelOptions() {
    if (this.state.inverterModels) {
      return this.state.inverterModels.map((item, i) =>
        <option key={i}>{ item }</option>
      );
    } else {
      return <option>No inverters defined!</option>
    }
  }

  render() {
    return (
      <div>
        <Col lg="8" className="mx-auto">
          <div className="text-white">
            <h1 className="text-white">
              Add a new design for the {this.state.firstname} {this.state.lastname} project
              <Button tag={Link} to={`/projects/${this.state.id}`} type="button" className="btn-icon ml-2" color="success">
                <span className="btn-inner--icon">
                  <i className="ni ni-bold-left"></i>
                </span>
                <span className="btn-inner--text">BACK</span>
              </Button>
            </h1>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <Card className="m-auto shadow">
              <CardHeader>Design Name</CardHeader>
              <CardBody>
                <p>Enter a name to identify your design by.</p>
                <FormGroup>
                  <Label>Design Name</Label>
                  <Input name="designName" onChange={this.handleInputChange} required type="text" placeholder="E.G. 'Design 1'" required/>
                </FormGroup>
              </CardBody>
            </Card>
            <div className="m-4"></div>
            <Card className="m-auto shadow">
              <CardHeader>Solar Equipment</CardHeader>
              <CardBody>
                <p>Information about the Solar Equipment you will be using.</p>
                <CardTitle>Solar Modules</CardTitle>
                <Row>
                  <Col lg="2">
                    <FormGroup>
                      <Label>Module Qty.</Label>
                      <Input name="moduleQty" onChange={this.handleInputChange} required type="number" />
                    </FormGroup>
                  </Col>
                  <Col lg="5">
                    <FormGroup>
                      <Label>Module Make</Label>
                      <Input name="selectedModuleMake" type="select" onChange={this.handleInputModuleMake}>
                        { this.moduleMakeOptions }
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="5">
                    <FormGroup>
                      <Label>Module Model</Label>
                      <Input name="selectedModuleModel" onChange={this.handleInputChange} type="select">
                        { this.moduleModelOptions }
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <CardTitle>Inverter</CardTitle>
                <Row>
                  <Col lg="2">
                    <FormGroup>
                      <Label>Inverter Qty.</Label>
                      <Input name="inverterQty" onChange={this.handleInputChange} required type="number" />
                    </FormGroup>
                  </Col>
                  <Col lg="5">
                    <FormGroup>
                      <Label>Inverter Make</Label>
                      <Input name="selectedInverterMake" type="select" onChange={this.handleInputInverterMake}>
                        { this.inverterMakeOptions }
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="5">
                    <FormGroup>
                      <Label>Inverter Model</Label>
                      <Input name="selectedInverterModel" onChange={this.handleInputChange} type="select">
                        { this.inverterModelOptions }
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div className="m-4"></div>
            <Card className="m-auto shadow">
              <CardHeader>Site Information</CardHeader>
              <CardBody>
                <p>Roof info, existing panel info</p>
                <CardTitle>Roof Information</CardTitle>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Label>Framing</Label>
                      <Input name="roofFraming" defaultValue='2x4 @ 24" O.C.' onChange={this.handleInputChange} type="select">
                        <option value='2x4 @ 24" O.C.'>2x4 @ 24" O.C.</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Label>Material</Label>
                      <Input name="roofMaterial" defaultValue="Comp. Shingle" onChange={this.handleInputChange} type="select">
                        <option value="Comp. Shingle">Comp. Shingle</option>
                        <option value="Flat-Tile">Flat-Tile</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <CardTitle>Main Service Panel</CardTitle>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Panel Upgrade?</Label>
                      <Input name="panelUpgrade" defaultValue="false" onChange={this.handleInputChange} type="select">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <Label>Main Panel</Label>
                      <Input name="mainPanel" defaultValue="200" onChange={this.handleInputChange} type="select">
                        <option value="225">225A</option>
                        <option value="200">200A</option>
                        <option value="175">175A</option>
                        <option value="150">150A</option>
                        <option value="125">125A</option>
                        <option value="100">100A</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Label>Main Breaker</Label>
                      <Input name="mainBreaker" defaultValue="200" onChange={this.handleInputChange} type="select">
                        <option value="225">225A</option>
                        <option value="200">200A</option>
                        <option value="175">175A</option>
                        <option value="150">150A</option>
                        <option value="125">125A</option>
                        <option value="100">100A</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Button className="float-right w-50" type="submit" color="success">SUBMIT</Button>
              </CardBody>
            </Card>
          </Form>
        </Col>
      </div>
    );
  }
}

export default withRouter(DesignSubmit);
