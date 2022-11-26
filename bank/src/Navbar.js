import React from 'react'
import crownlogo from './logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {
    const user = "TempUser Name"
    // var icon = (
    //     <span class = 'logo'>
    //         <a href = '/'/> 
    //         <img src = './login.png' height = "33" width = "120" /> 
    //     </span>
    // );
    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand>
                        <a href = "/" ><img src = {crownlogo} height = "60"/></a>
                          Opes
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/pay">Pay</Nav.Link>
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