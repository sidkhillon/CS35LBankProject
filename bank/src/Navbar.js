import React, { Component } from 'react'
import { auth } from "./backend/firebase";
import { db } from "./backend/firebase"
import { doc, getDoc } from "firebase/firestore";
import crownlogo from './assets/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getCurrentEmail } from './backend/currentUser';
import { onAuthStateChanged, signOut } from "firebase/auth";

class NavbarComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
          name: null
        }
    }
    // const user = getCurrentEmail(); // TODO: Get user's name
    componentDidMount() {
        onAuthStateChanged(auth, async (user) => {
          if (user) { // User is signed in
            const userData = await getDoc(doc(db, "users", user.uid));
            const name = userData.data().name;
            this.setState({name: name});
          }
        });
      }
    render() {
        return (
          <div>
            <Navbar bg="light">
              <Container>
                <Navbar.Brand>
                  <a href = "/" ><img src = {crownlogo} height = "60" alt="opes-logo"/></a>
                  Opes
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav style={{ paddingBottom: "3px" }} className="me-auto">
                  <Nav.Link href="/pay">Pay</Nav.Link>
                  <Nav.Link href="/deposit">Deposit</Nav.Link>
                  <Nav.Link href="/withdraw">Withdraw</Nav.Link>
                  </Nav>
                  {this.state.name ||
                    <Nav style={{ paddingBottom: "3px" }} className="ms-auto">
                      <Nav.Link href="/loginform">Login</Nav.Link>
                      <Nav.Link href="/signup">Signup</Nav.Link>
                    </Nav>
                  }
                </Navbar.Collapse>
                {this.state.name &&
                    <Navbar.Text style={{ paddingTop: "6px", paddingLeft:"8px"}}>{this.state.name}</Navbar.Text>
                }
              </Container>
            </Navbar>
          </div>
        )
    }
}

export default NavbarComponent
