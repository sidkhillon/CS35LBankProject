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
                        <img src = {crownlogo} height = "60"/> 
                           Opes
                    </Navbar.Brand>
                    <Navbar.Text>{user}</Navbar.Text>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent