import React, { Component } from 'react'
import { auth } from "./backend/firebase";
import { db } from "./backend/firebase"
import { doc, getDoc } from "firebase/firestore";
import Transactions from "./Transactions"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AddTransaction from './AddTransaction';
import { getCurrentUID } from './backend/currentUser';
import { onAuthStateChanged, signOut } from "firebase/auth";


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      email: "",
      balance: 0,
    };
  }

  /*
  async getUserInfo () { // TODO: Methods inside are not fetching properly
    const balance = await getCurrentBalance();
    const email = getCurrentEmail();
    const currUID = getCurrentUID();
    this.setState({email: email, balance: balance});
  }
  */
  componentDidMount() {
    onAuthStateChanged(auth, async (user) => {
      if (user) { // User is signed in
        const userData = await getDoc(doc(db, "users", user.uid));
        console.log("New user real");
        const bal = userData.data().balance;
        const email = user.email;
        this.setState({email: email, balance: bal});
      } else {
        window.location = '/loginform';
      }
    });
  }

  render() {
    console.log(getCurrentUID());
    const test = { // TODO: Populate transaction data
      12319083: { date: 'testDate', description: 'testDesc', sender: 'Sid', recipient: 'Jackson', amount: 123 },
      12319084: { date: 'testDate', description: 'testDesc', sender: 'Jackson', recipient: 'Sid', amount: 124 },
      12319085: { date: 'testDate', description: 'testDesc', sender: 'Sid', recipient: 'Juskeerat', amount: 125 },
      12319086: { date: 'testDate', description: 'testDesc', sender: 'Sid', recipient: 'Jackson', amount: 126 }
    }
    //this.getUserInfo();
    /*
    var userInfo = new Array();
    this.getUserInfo().then((res) => userInfo = res);
    const user = userInfo[0];
    const bal = userInfo[1];
    const transactions = userInfo[2];
*/
    // const bal = 124.23

    const setModalVisibility = (val) => this.setState({modalVisible: val});
    const currentHrs = new Date().getHours();
    return ( // TODO: Search functionality
      <div>
        <Container>
          <Row>
            <Col>
              <div style={{display: 'flex', justifyContent: "center", marginTop: "30px"}}>
                <h1>{(currentHrs < 12 ? "Good morning, " : currentHrs < 17 ? "Good afternoon, " : "Good evening, ") + this.state.email}</h1>
              </div>
              <div style={{display: 'flex', justifyContent: "center"}}>
                <h3>{"Your balance is $" + this.state.balance}</h3>
              </div>
            </Col>
          </Row>
          <hr/>
          <Row style={{ marginTop: "20px" }}>
            <Col></Col>
            <Col xs="auto" >
              <Form className="d-flex">
                <Form.Control style={{ marginRight: "8px" }} type='date'/>
                <Form.Select style={{ marginRight: "8px" }}>
                    <option>Select a User</option>
                    <option value="test">test</option>
                    <option value="test2">test2</option>
                </Form.Select>
                <Button>Search</Button>
              </Form>
            </Col>
          </Row>
          <Transactions data={test} />
          <Row style={{ marginTop: "5px" }}>
            <Col></Col>
            <Col xs="auto" >
              <Button onClick={() => setModalVisibility(true)}>Add a Transaction</Button>
            </Col>
            <Col xs="auto" >
              <Button onClick={() => signOut(auth).then(() => {window.location = "/loginform"})}>Sign Out</Button>
            </Col>
          </Row>
        </Container>
        <AddTransaction show={this.state.modalVisible} hide ={() => setModalVisibility(false)}></AddTransaction>
      </div>
    )
  }
}