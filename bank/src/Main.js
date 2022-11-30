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
      transactions: null, 
      emailField: "", 
      dateField: ""
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

  handleChange(event, date, name){
    let newMap = new Map();
    let count = 0;
    for (let i =0; i<this.state.transactions.size(); i++){
      if(date && name){
        if(this.state.transactions[i].date == date && (this.state.transactions[i].sender == name || this.state.transactions[i].receiver == name)){
          newMap[count] = this.state.transactions[i];
          count++;
        }
      else if(date && this.state.transactions[i].date == date){
        newMap[count] = this.state.transactions[i];
        count++;
      }
      else if(name && (this.state.transactions[i].sender == name || this.state.transactions[i].receiver == name)){
        newMap[count] = this.state.transactions[i];
        count++;
      }
      }    
    }
    if(name || date){
      this.setState({transactions: newMap});
    }
  }

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
          const senderName = await getUserNameByID(transactions[i].sender);
          const receiverName = await getUserNameByID(transactions[i].receiver);

          const date = transactions[i].date.toDate();
          // const dateString = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
          const dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getFullYear() - 2000) + "ㅤ–ㅤ" + strTime;
          transactions[i].sender = transactions[i].note == "Deposit" ? "Bank" : senderName;
          transactions[i].receiver = transactions[i].note == "Withdrawal" ? "Bank" : receiverName;
          transactions[i].amount = transactions[i].note == "Withdrawal" ? -transactions[i].amount : transactions[i].amount;
          let data = { date: dateString, description: transactions[i].note, sender: transactions[i].sender, recipient: transactions[i].receiver, amount: transactions[i].amount.toFixed(2) };
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
                <h1>{(currentHrs < 12 ? "Good morning, " : currentHrs < 17 ? "Good afternoon, " : "Good evening, ") + this.state.name}</h1>
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
               <Form.Control style={{ marginRight: "8px" }} type='email' placeholder='Search Transactions' value={this.emailField}/>  
                <Button onClick ={()=> this.handleChange(this.dateField,this.emailField)}>Search</Button>
              </Form>
            </Col>
          </Row>
          { () => {
            if (this.state.transactions) {
                return <Transactions data={this.state.transactions} />
            }
          }}
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

