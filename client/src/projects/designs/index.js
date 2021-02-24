import React from "react";
import { Col, Row, Card, CardBody, CardTitle, CardHeader, FormGroup, Label, Button, Input, Form, UncontrolledAlert } from "reactstrap";
import { withRouter, Link } from 'react-router-dom';
import { getDesignById, putDesign, deleteDesign } from "./designs-api";

class DesignId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      designId: this.props.match.params.designid,
      projectId: this.props.match.params.projectid,
      module: {
        modulemake: '',
        modulemodel: '',
        watts: 0,
        voc: 0,
        vmp: 0,
        isc: 0,
        imp: 0,
      },
      inverter: {
        invertermake: '',
        invertermodel: '',
        inverteroutput: 0,
        breaker: 0,
        inverterinput: 0,
        watts: 0,
        inverterType: ''
      },
      project: {
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        state: '',
        lastmodified: '',
        zip: 0
      },
      design: {
        designId: 0,
        projectId: 0,
        moduleId: 0,
        moduleQty: 0,
        inverterId: 0,
        inverterQty: 0,
        roofFraming: '',
        roofMaterial: '',
        panelUpgrade: false,
        mainPanel: 0,
        mainBreaker: 0,
        designName: '',
        moduleMake: '',
        moduleModel: '',
        module: '',
        inverterMake: '',
        inverterModel: '',
        inverter: ''
      },
      inputs: {
        selectedModuleMake: '',
        selectedModuleModel: '',
        selectedInverterMake: '',
        selectedInverterModel: ''
      },
      modules: [],
      modulesMap: {},
      inverters: [],
      invertersMap: {},
      moduleMakes: [],
      inverterMakes: [],
      moduleModels: [],
      inverterModels: [],
      editing: false,
      successEdited: false
    }
    this.getDesign = this.getDesign.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputModuleMake = this.handleInputModuleMake.bind(this);
    this.handleInputInverterMake = this.handleInputInverterMake.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getDesign();
  }

  getDesign() {
    getDesignById(this.state.projectId, this.state.designId)
    .then((res) => {
      var inputs = res.inputs;
      inputs["selectedModuleMake"] = res.module.modulemake;
      inputs["selectedModuleModel"] = res.module.modulemodel;
      inputs["selectedInverterMake"] = res.inverter.invertermake;
      inputs["selectedInverterModel"] = res.inverter.invertermodel;
      this.setState({
        module: res.module,
        inverter: res.inverter,
        project: res.project,
        design: res.design,
        inputs: inputs,
        modules: res.modules,
        modulesMap: res.modulesMap,
        inverters: res.inverters,
        invertersMap: res.invertersMap,
        moduleMakes: res.moduleMakes,
        inverterMakes: res.inverterMakes,
        moduleModels: res.moduleModels,
        inverterModels: res.inverterModels
      });
    })
    .catch(() => this.props.history.push('/projects'))
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

  handleInputModuleMake(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var inputs = this.state.inputs;
    var moduleModels = this.state.modulesMap[value]
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

  handleSubmit() {
    putDesign(this.state.inputs, this.state.projectId, this.state.designId)
    .then((res) => {
      this.getDesign();
      this.setState({
        successEdited: true
      });
    });
  }

  handleDelete() {
    deleteDesign(this.state.projectId, this.state.designId)
    .then(() => this.props.history.push(`/projects/${this.state.projectId}`))
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

  handleEditToggle() {
    if (this.state.editing) {
      this.handleSubmit();
    }
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-white">
          { this.state.design.designName }
          <Button tag={Link} to={`/projects/${this.state.projectId}`} type="button" className="btn-icon ml-2" color="success">
            <span className="btn-inner--icon">
              <i className="ni ni-bold-left"></i>
            </span>
            <span className="btn-inner--text">BACK</span>
          </Button>
        </h1>
        <h3 className="text-white">For the { this.state.project.firstname + ' ' + this.state.project.lastname } residence located at { this.state.project.street } in { this.state.project.city + ', ' + this.state.project.state }</h3>
        <Row>
          <Col lg="6">
            {
            this.state.successEdited == true &&
            <UncontrolledAlert color="success" fade={true}>
            <span className="alert-inner--icon">
              <i className="ni ni-like-2" />
            </span>
            <span className="alert-inner--text ml-1">
              <strong>Success!</strong> Design successfully updated
            </span>
            </UncontrolledAlert>
            }
            <Card>
              <Form>
                <CardHeader>Design</CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label><b>Design Name</b></Label>
                        { this.state.editing ? <Input type="text" defaultValue={this.state.design.designName} name="designField" onChange={this.handleInputChange} /> : <p>{ this.state.design.designName }</p> }
                      </FormGroup>
                    </Col>
                  </Row>
                  <h3><u>PV Equipment</u></h3>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label><b>Modules</b></Label>
                        { this.state.editing ?
                        <Row>
                          <Col lg="3">
                            <Input type="number" name="moduleQtyField" onChange={this.handleInputChange} defaultValue={ this.state.design.moduleQty } />
                          </Col>
                          <Col lg="4">
                            <Input type="select" name="selectedModuleMake" onChange={this.handleInputModuleMake} defaultValue={ this.state.module.modulemake }>
                              { this.moduleMakeOptions }
                            </Input>
                          </Col>
                          <Col lg="5">
                            <Input type="select" name="selectedModuleModel" onChange={this.handleInputChange} defaultValue={ this.state.module.modulemodel }>
                              { this.moduleModelOptions }
                            </Input>
                          </Col>
                        </Row> 
                        :
                        <p>({ this.state.design.moduleQty }) { this.state.module.modulemake } { this.state.module.modulemodel }</p>
                        }
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label><b>Inverters</b></Label>
                        { this.state.editing ?
                        <Row>
                          <Col lg="3">
                            <Input type="number" name="inverterQtyField" onChange={this.handleInputChange} defaultValue={ this.state.design.inverterQty } />
                          </Col>
                          <Col lg="4">
                            <Input type="select" name="selectedInverterMake" onChange={this.handleInputInverterMake} defaultValue={ this.state.inverter.invertermake }>
                              { this.inverterMakeOptions }
                            </Input>
                          </Col>
                          <Col lg="5">
                            <Input type="select" name="selectedInverterModel" onChange={this.handleInputChange} defaultValue={ this.state.inverter.invertermodel }>
                              { this.inverterModelOptions }
                            </Input>
                          </Col>
                        </Row>
                        :
                        <p>({ this.state.design.inverterQty }) { this.state.inverter.invertermake } { this.state.inverter.invertermodel }</p>
                        }
                      </FormGroup>
                    </Col>
                  </Row>
                  <h3><u>Site Information</u></h3>
                  <Row>
                    <Col>
                        <FormGroup>
                          <Label><b>Panel upgrade?</b></Label>
                          { this.state.editing ?
                          <Input name="panelUpgradeField" defaultValue={this.state.design.panelUpgrade} onChange={this.handleInputChange} type="select">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </Input>
                          :
                          <p>{ this.state.design.panelUpgrade ? "Yes" : "No"}</p>
                          }
                        </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label><b>Main Panel</b></Label>
                        { this.state.editing ?
                        <Input type="select" name="mainPanelField" onChange={this.handleInputChange} defaultValue={this.state.design.mainPanel}>
                          <option value="225">225A</option>
                          <option value="200">200A</option>
                          <option value="175">175A</option>
                          <option value="150">150A</option>
                          <option value="125">125A</option>
                          <option value="100">100A</option>
                        </Input>
                        :
                        <p>{ this.state.design.mainPanel }A</p>
                        }
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label><b>Main Breaker</b></Label>
                        { this.state.editing ?
                        <Input type="select" name="mainBreakerField" onChange={this.handleInputChange} defaultValue={this.state.design.mainBreaker}>
                          <option value="225">225A</option>
                          <option value="200">200A</option>
                          <option value="175">175A</option>
                          <option value="150">150A</option>
                          <option value="125">125A</option>
                          <option value="100">100A</option>
                        </Input>
                        :
                        <p>{ this.state.design.mainBreaker }A</p>
                        }
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label><b>Roof Material</b></Label>
                        { this.state.editing ? 
                        <Input name="roofMaterialField" defaultValue={this.state.design.roofMaterial} onChange={this.handleInputChange} type="select">
                          <option value="Comp. Shingle">Comp. Shingle</option>
                          <option value="Flat-Tile">Flat-Tile</option>
                        </Input>
                        :
                        <p>{ this.state.design.roofMaterial }</p>
                        }
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label><b>Roof Framing</b></Label>
                        { this.state.editing ?
                        <Input name="roofFramingField" defaultValue={this.state.design.roofFraming} onChange={this.handleInputChange} type="select">
                          <option value='2x4 @ 24" O.C.'>2x4 @ 24" O.C.</option>
                        </Input>
                        :
                        <p>{ this.state.design.roofFraming }</p>
                        }
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button type="button" color="warning" className="btn-icon" onClick={this.handleEditToggle}>
                    <span className="btn-inner--icon mr-1">
                      <i className="ni ni-ruler-pencil"></i>
                    </span>
                    <span className="btn-inner--text">EDIT</span>
                  </Button>
                  <Button onClick={this.handleDelete} className="ml-2" type="button" color="danger">
                    <span className="btn-inner--icon mr-1">
                      <i className="ni ni-fat-remove"></i>
                    </span>
                    <span className="btn-inner--text">DELETE</span>
                  </Button>
                </CardBody>
              </Form>
            </Card>
          </Col>
          <Col lg="6">
              <Card className="shadow mb-2">
                <CardHeader>{ this.state.design.designName }</CardHeader>
                <CardBody>
                  <h3>Project Information</h3>
                  <FormGroup>
                    <Label><b>Name</b></Label>
                    <p>{ this.state.project.firstname + ' ' + this.state.project.lastname }</p>
                  </FormGroup>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label><b>Street</b></Label>
                        <p>{ this.state.project.street }</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label><b>City</b></Label>
                        <p>{ this.state.project.city }</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label><b>State</b></Label>
                        <p>{ this.state.project.city }</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label><b>Zip</b></Label>
                        <p>{ this.state.project.zip }</p>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(DesignId);