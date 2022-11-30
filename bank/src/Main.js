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
import { processTransactions, getAllTransactions } from './backend/getTransactions';
import { getUserNameByID } from './backend/getTransactions';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: "",
      balance: 0,
      uid: null,
      transactions: null
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
        const bal = userData.data().balance.toFixed(2);
        const name = userData.data().name;

        const transRefs = await getAllTransactions(user.uid);
        const transactions = await processTransactions(transRefs);
        let userTransactions = new Map();
        for (let i = 0; i < transactions.length; i++) {
          console.log(`Sender: ${transactions[i].sender}   Receiver: ${transactions[i].receiver}`);
          const senderName = await getUserNameByID(transactions[i].sender);
          const receiverName = await getUserNameByID(transactions[i].receiver);
          const date = transactions[i].date.toDate();
          const dateString = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
          let data = { date: dateString, description: transactions[i].note, sender: senderName, recipient: receiverName, amount: transactions[i].amount.toFixed(2) };
          userTransactions[i] = data;
        }
        this.setState({name: name, balance: bal, uid: user.uid, transactions: userTransactions});
        
      } else {
        window.location = '/loginform';
      }
    });
  }

  render() {
    console.log(getCurrentUID());
    let history = this.state.transactions == null ? 
    [{0: { date: 'Loading...', description: 'Loading...', sender: 'Loading...', recipient: 'Loading...', amount: 0 }}, 'Sid'] : 
    [this.state.transactions, this.state.name];
    // let test = { // TODO: Populate transaction data
    //   12319083: { date: 'testDate', description: 'testDesc', sender: 'Sid', recipient: 'Jackson', amount: 123 },
    //   12319084: { date: 'testDate', description: 'testDesc', sender: 'Jackson', recipient: 'Sid', amount: 124 },
    //   12319085: { date: 'testDate', description: 'testDesc', sender: 'Sid', recipient: 'Juskeerat', amount: 125 },
    //   12319086: { date: 'testDate', description: 'testDesc', sender: 'Sid', recipient: 'Jackson', amount: 126 }
    // }

    const setModalVisibility = (val) => this.setState({modalVisible: val});
    const currentHrs = new Date().getHours();
    return ( // TODO: Search functionality
      <div>
        <Container>
          <Row>
            <Col>
              <div style={{display: 'flex', justifyContent: "center", marginTop: "30px"}}>
                <h1 style = {{color: "#E38424"}}>{(currentHrs < 12 ? "Good morning, " : currentHrs < 17 ? "Good afternoon, " : "Good evening, ") + this.state.name}</h1>
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
               <Form.Control style={{ marginRight: "8px" }} type='email' placeholder='Search Transactions' />   
                <Button>Search</Button>
              </Form>
            </Col>
          </Row>
          <Transactions data={history} />
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
        <AddTransaction show={this.state.modalVisible} hide={() => setModalVisibility(false)}></AddTransaction>
      </div>
    )
  }
}
