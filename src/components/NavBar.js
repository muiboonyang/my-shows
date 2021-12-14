import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">My Show App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/search">Search</Nav.Link>
            {/* <Nav.Link href="/favourites">Favourites</Nav.Link> */}
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
