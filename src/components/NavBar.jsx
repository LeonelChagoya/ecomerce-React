import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FavoritesSidebar from "./CartSidebar";

const NavBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#/">E-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/">Home</Nav.Link>
              <Nav.Link href="/#/purchases">Purchases</Nav.Link>

              {token ? (
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              ) : (
                <Nav.Link href="/#/login">Login</Nav.Link>
              )}
              <Nav.Link as={Button} onClick={handleShow}>
                <i className="fi fi-rr-shop"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <FavoritesSidebar show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
