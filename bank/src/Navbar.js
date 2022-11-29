import React from 'react'
import crownlogo from './assets/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getCurrentEmail } from './backend/currentUser';

function NavbarComponent() {
    const user = getCurrentEmail(); // TODO: Get user's name
    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand>
                        <a href = "/" ><img src = {crownlogo} height = "60" alt="opes-logo"/></a>
                            &nbsp;Opes
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/pay">Pay</Nav.Link>
            <Nav.Link href="/deposit">Deposit</Nav.Link>
            <Nav.Link href="/withdraw">Withdraw</Nav.Link>
            <Nav.Link href="/loginform">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
                    <Navbar.Text>{user}</Navbar.Text>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent