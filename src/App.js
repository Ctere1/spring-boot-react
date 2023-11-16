import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import logo from './assets/logo.svg';

import Login from "./components/loginComponent";
import Register from "./components/registerComponent";
import Home from "./components/homeComponent";
import Profile from "./components/profileComponent";
import BoardUser from "./components/boardUserComponent";
import BoardModerator from "./components/boardModeratorComponent";
import BoardAdmin from "./components/boardAdminComponent";
import AddTutorial from "./components/addTutorialComponent";
import Tutorial from "./components/tutorialComponent";
import TutorialsList from "./components/tutorialListComponent";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/eventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Logo"
              />{' '}
              Tutorial API
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {currentUser ? (
                <>
                  <Nav className="me-auto">
                    <Nav.Link href="/tutorials">Tutorials</Nav.Link>
                    <NavDropdown title="Boards" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/user">
                        User
                      </NavDropdown.Item>
                      {showModeratorBoard && (
                        <NavDropdown.Item href="/mod">Moderator</NavDropdown.Item>
                      )}
                      {showAdminBoard && (
                        <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
                      )}
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="http://localhost:8080/swagger-ui/index.html#/" target="_blank">
                        Swagger Doc
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav><Nav>
                    <Nav.Link href="/profile">  {currentUser.username}</Nav.Link>
                    <Nav.Link eventKey={2} href="/logout" onClick={this.logOut}>
                      Logout
                    </Nav.Link>
                  </Nav>
                </>
              ) : (
                <>
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                  </Nav>
                  <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link eventKey={2} href="/register">Signup</Nav.Link>
                  </Nav>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container mt-3">

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />

            {currentUser && (
              <>
                <Route exact path="/tutorials/add" element={<AddTutorial />} />
                <Route path="/tutorials/:id" element={<Tutorial />} />
                <Route path="/tutorials" element={<TutorialsList />} />
                <Route path="/user" element={<BoardUser />} />
                <Route path="/mod" element={<BoardModerator />} />
                <Route path="/admin" element={<BoardAdmin />} />
              </>
            )}
          </Routes>

        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}

      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);