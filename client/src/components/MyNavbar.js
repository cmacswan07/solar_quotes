import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { logout } from "auth-api";

class MyNavbar extends React.Component {
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  }

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  }

  handleLogOut() {
    logout().then(() => {
      window.location.reload();
    });
  }

  render() {
    return (
      <div>
        <Navbar
          className="navbar-dark shadow bg-info"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img className="mr-2" src={require("assets/img/brand/sunrise_logo.png")} />
              Sunny Solar Quotes
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={this.state.collapseClasses}
              onExiting={this.onExiting}
              onExited={this.onExited}
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      Sunrise Design App
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              { this.props.isAuthenticated && (
              <React.Fragment>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink to="/" tag={Link}>
                      Home
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Equipment</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/modules" tag={Link}>
                        Modules
                      </DropdownItem>
                      <DropdownItem to="/inverters" tag={Link}>
                        Inverters
                      </DropdownItem>
                      {/*<DropdownItem>
                        Attachments
                      </DropdownItem>
                      <DropdownItem>
                        Racking
                      </DropdownItem>*/}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem className="d-lg-none">
                    <NavLink href="#" onClick={this.handleLogOut}>
                      Log Out
                    </NavLink>
                  </NavItem>
                  {/*<NavItem>
                    <NavLink href="#">
                      Clients
                    </NavLink>
                  </NavItem>*/}
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <UncontrolledDropdown inNavbar>
                      <DropdownToggle nav className="nav-link-icon">
                        <i className="ni ni-circle-08 mr-2" />
                        <span className="nav-link-inner--text d-lg-none">
                          Settings
                        </span>
                      </DropdownToggle>
                      <DropdownMenu
                        aria-labelledby="navbar-default_dropdown_1"
                        right
                      >
                        {/*<DropdownItem
                          href="#"
                          onClick={e => e.preventDefault()}
                        >
                          Settings
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Notifications
                        </DropdownItem>
                        <DropdownItem divider />*/}
                        <DropdownItem
                          onClick={this.handleLogOut}
                        >
                          Log Out
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </NavItem>
                </Nav>
              </React.Fragment>)
              }
            </UncontrolledCollapse>
        </Container>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
