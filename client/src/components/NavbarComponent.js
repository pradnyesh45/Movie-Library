import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import AuthContext from "../context/authContext";

function NavbarComponent() {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  async function LogoutUser() {
    localStorage.removeItem("token");
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            {!loggedIn && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}

            {!loggedIn && (
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            )}

            {loggedIn && (
              <Nav.Link as={Link} to="/logout" onClick={LogoutUser}>
                Logout
              </Nav.Link>
            )}

            {loggedIn && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
