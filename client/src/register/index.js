import React from "react";
import {
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import { registerUser } from "auth-api";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      userExists: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    registerUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
    .then((res) => {
      this.props.authenticate();
      this.props.history.push('/')
    })
    .catch(() => this.setState({ userExists: true }));
  }

  render() {
    return (
      <div className="pt-lg-7">
        <Row className="justify-content-center">
          <Col lg="5">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-white">
                <div className="text-muted text-center mb-3">
                  <h3>Create an account</h3>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Already have an account? <Link to="/login">Log In!</Link></small>
                </div>
                <Form onSubmit={this.handleSubmit} role="form">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="username" onChange={this.handleInputChange} placeholder="Name" type="text" />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="email" onChange={this.handleInputChange} placeholder="Email" type="email" />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password"
                        onChange={this.handleInputChange}
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                      />
                    </InputGroup>
                  </FormGroup>
                  { this.state.userExists && 
                  <UncontrolledAlert color="danger">User exists!!!</UncontrolledAlert>
                  }
                  <div className="text-center">
                    <Button
                      className="mt-4"
                      color="primary"
                      type="submit"
                    >
                      Create account
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Register;
