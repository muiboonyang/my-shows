import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/ClapperboardColor.svg/1024px-ClapperboardColor.svg.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            My Show App
          </Navbar.Brand>

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
