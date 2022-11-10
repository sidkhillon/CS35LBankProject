import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {
    const user = "TempUser Name"
    return (
        <div>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand>Opes</Navbar.Brand>
                    <Navbar.Text>{user}</Navbar.Text>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent