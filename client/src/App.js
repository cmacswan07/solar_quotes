// Core React components.
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "reactstrap";

// Views
import Projects from "projects";
import ProjectSubmit from "projects/submit-project";
import ProjectId from "projects/project-id";
import DesignSubmit from "projects/designs/submit-design";
import DesignId from "projects/designs";
import Modules from "modules";
import ModuleSubmit from "modules/submit-module";
import ModuleId from "modules/module-id";
import Inverters from "inverters";
import InverterSubmit from "inverters/submit-inverter";
import InverterId from "inverters/inverter-id";
import Login from "login";
import Register from "register";

// Components
import MyNavbar from "components/MyNavbar";
import Header from "components/Header";
import Footer from "components/Footer";
import PrivateRoute from "components/PrivateRoute";

// Auth API
import { getUser } from "auth-api";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      isLoading: true
    }
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    getUser()
    .then((res) => {
      console.log(res.data);
      if (res.data !== false) {
        this.setState({
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        this.setState({
          isLoading:false
        });
      }
    });
  }

  authenticate() {
    this.setState({
      isAuthenticated: true
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <MyNavbar isAuthenticated={this.state.isAuthenticated} />
        <Container className="pt-5">
          { !this.state.isLoading ? (
          <Switch>
            <Route
              exact
              path="/"
            >
              <Redirect to="/projects" />
            </Route>
            <Route
              exact
              path="/login"
              render={props => <Login authenticate={this.authenticate} {...props} />}
            />
            <Route
              exact
              path="/register"
              render={props => <Register authenticate={this.authenticate} {...props} />}
            />
            <PrivateRoute
              exact
              path="/projects"
              isAuthenticated={this.state.isAuthenticated}
              component={Projects}
            />
            <PrivateRoute
              path="/projects/submit-project"
              exact
              isAuthenticated={this.state.isAuthenticated}
              component={ProjectSubmit}
            />
            <PrivateRoute
              path="/projects/:id"
              exact
              isAuthenticated={this.state.isAuthenticated}
              component={ProjectId}
            />
            <PrivateRoute
              path="/projects/:id/designs/submit-design"
              exact
              isAuthenticated={this.state.isAuthenticated}
              component={DesignSubmit}
            />
            <PrivateRoute
              path="/projects/:projectid/designs/:designid"
              exact
              isAuthenticated={this.state.isAuthenticated}
              component={DesignId}
            />
            <PrivateRoute
              path="/modules"
              exact
              isAuthenticated={this.state.isAuthenticated}
              component={Modules}
            />
            <PrivateRoute
              path="/modules/submit-module"
              exact
              isAuthenticated={this.state.isAuthenticated}
              component={ModuleSubmit}
            />
            <PrivateRoute
              path="/modules/:id"
              exact
              isAuthenticated={this.state.isAuthenticated}
              component={ModuleId}
            />
            <PrivateRoute
              path="/inverters"
              exact
              isAuthenticated={this.state.isAuthenticated}
              component={Inverters}
            />
            <PrivateRoute
              path="/inverters/submit-inverter"
              exact
              isAuthenticated={this.state.isAuthenticated}
              component={InverterSubmit}
            />
            <PrivateRoute
              path="/inverters/:id"
              exact
              isAuthenticated={this.state.isAuthenticated}
              component={InverterId}
            />
            <Redirect to="/" />
          </Switch>
          ) : (
            <h1>LOADING!!</h1>
          ) }
          <Footer />
        </Container>
      </BrowserRouter>
    )
  }
}

export default App;