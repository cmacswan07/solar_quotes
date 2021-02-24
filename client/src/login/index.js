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
import { login } from "auth-api";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      incorrectCredentials: false
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
    login({
      username: this.state.username,
      password: this.state.password
    })
    .then(() => {
      this.props.authenticate();
      this.props.history.push('/')
    })
    .catch(() => {
      console.log("error");
      this.setState({ incorrectCredentials: true })
    });
  }

  render() {
    return (
      <div className="pt-lg-7">
        <Row className="justify-content-center">
          <Col lg="5">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-white">
                <div className="text-center text-muted">
                  <h3>Sign In</h3>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Need an account? <Link to="/register">Create one!</Link></small>
                </div>
                <Form onSubmit={this.handleSubmit} role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="username" onChange={this.handleInputChange} placeholder="Username" type="text" />
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
                        placeholder="Password"
                        name="password"
                        onChange={this.handleInputChange}
                        type="password"
                        autoComplete="off"
                      />
                    </InputGroup>
                    { this.state.incorrectCredentials && 
                    <UncontrolledAlert className="mt-2" color="danger">
                      Incorrect credentials.
                    </UncontrolledAlert>
                    }
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span>Remember me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="submit"
                    >
                      Sign in
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

export default Login;
