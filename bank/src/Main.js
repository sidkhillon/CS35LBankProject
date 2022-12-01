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
import { onAuthStateChanged } from "firebase/auth";
import { processTransactions, getAllTransactions, getTransactionsByDate, getSharedTransactions, getWithdrawals, getDeposits } from './backend/getTransactions';
import { getUserNameByID } from './backend/getTransactions';
import getUserByEmail from './backend/getUserByEmail';


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
      dateField: "",
      numTransactions: 10
    };

    this.handleChange = this.handleChange.bind(this)
  }

  async submit(){
    let newMap = {};
    let emailUID = await getUserByEmail(this.state.emailField);
    const date = new Date(this.state.dateField);
    // Can't search for self
    if (emailUID === this.state.uid){
      emailUID = null;
    }
    if (this.state.dateField && emailUID){
      const correctDate = await getTransactionsByDate(this.state.uid, date);
      const correctDateTrans = Object.keys(correctDate);
      const correctUser = await getSharedTransactions(emailUID, this.state.uid);
      const correctUserTrans = Object.keys(correctUser);
      const sharedTrans = correctDateTrans.filter(x => correctUserTrans.indexOf(x) !== -1);
      sharedTrans.forEach((transaction) => {
        newMap[transaction] = correctDate[transaction];
      });
    }
    else if (this.state.dateField) {
      newMap = await getTransactionsByDate(this.state.uid, date);
    }
    else if (emailUID){
      newMap = await getSharedTransactions(emailUID, this.state.uid);
    }
    newMap = await this.parseTransactions(newMap, this.state.uid, this.state.name);
    if(emailUID || this.state.dateField){
      this.setState({transactions: newMap});
    }
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async showWithdrawals(){
    if (this.state.uid){
      let withdrawals = await getWithdrawals(this.state.uid);
      withdrawals = await this.parseTransactions(withdrawals, this.state.uid, this.state.name);
      this.setState({transactions: withdrawals});
    }
  }
  
  async showDeposits(){
    if (this.state.uid){
      let deposits = await getDeposits(this.state.uid);
      deposits = await this.parseTransactions(deposits, this.state.uid, this.state.name);
      this.setState({transactions: deposits});
    }
  }

  parseDate(dateObject){
    const date = dateObject.toDate()
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    const dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getFullYear() - 2000) + "ㅤ–ㅤ" + strTime;
    return dateString
  }

  async parseTransactions(transactions, uid, name){
    // Iterating through the transactions and determining if the value should be positive or negative
    for (const transaction in transactions){
      // If it wasn't a withdrawal or deposit, check if it was positive or negative
      if (transactions[transaction]["sender"] !== transactions[transaction]["receiver"]){
        // If the user sent the money, they lost money from their account
        if (transactions[transaction]["sender"] === uid){
          transactions[transaction]["amount"] *= -1;
          transactions[transaction]["senderName"] = name;
          const receiver = await getUserNameByID(transactions[transaction]["receiver"]);
          transactions[transaction]["receiverName"] = receiver;
        } else {
          transactions[transaction]["receiverName"] = name;
          const sender = await getUserNameByID(transactions[transaction]["sender"]);
          transactions[transaction]["senderName"] = sender;
        }
      }
      // Checking if it was a withdrawal or a deposit
      else if (transactions[transaction]["amount"] < 0){
        transactions[transaction]["senderName"] = name;
        transactions[transaction]["receiverName"] = "Bank";
      }
      else {
        transactions[transaction]["senderName"] = "Bank";
        transactions[transaction]["receiverName"] = name;
      }
      transactions[transaction]["date"] = this.parseDate(transactions[transaction]["date"])
    }
    return transactions;
  }

  componentDidMount() {
    onAuthStateChanged(auth, async (user) => {
      if (user) { // User is signed in
        const userData = await getDoc(doc(db, "users", user.uid));
        const bal = userData.data().balance.toFixed(2);
        const name = userData.data().name;

        const transRefs = await getAllTransactions(user.uid);
        let transactions = await processTransactions(transRefs);
        transactions = await this.parseTransactions(transactions, user.uid, name);
        this.setState({name: name, balance: bal, uid: user.uid, transactions: transactions, emailField: "", dateField: "", numTransactions: 10});
        
      } else {
        window.location = '/loginform';
      }
    });
  }

  render() {
    let history = this.state.transactions == null ? 
    { date: 'Loading...', note: 'Loading...', sender: 'Loading...', receiver: 'Loading...', amount: 0 } : this.state.transactions;
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
            <Col xs="auto" >
              <Button onClick={() => this.showWithdrawals()}>See Withdrawals</Button>
            </Col>
            <Col xs="auto" >
              <Button onClick={() => this.showDeposits()}>See Deposits</Button>
            </Col>
            <Col xs="auto" >
              <Button onClick={() => setModalVisibility(true)}>Make a Payment</Button>
            </Col>
            <Col></Col>
            <Col xs="auto" >
              <Form className="d-flex">
               <Form.Control style={{ marginRight: "8px" }} type='date' name='dateField' value={this.state.dateField} onChange={this.handleChange}/>
               <Form.Control style={{ marginRight: "8px" }} type='email' name='emailField' placeholder='Search users (email)' value={this.state.emailField} onChange={this.handleChange}/>  
                <Button style={{ marginRight: "8px" }} onClick ={()=> this.submit()}>Search</Button>
                <Button onClick ={()=> this.componentDidMount()}>Reset</Button>
              </Form>
            </Col>
          </Row>
          <Transactions data={{transactions: history, numTrans: this.state.numTransactions}} />
          <Row style={{ marginTop: "5px" }}>
            <Col></Col>
            <Col xs="auto" >
              {(this.state.numTransactions < Object.keys(history).length) ? <Button onClick={() => this.setState({numTransactions: this.state.numTransactions + 5})}>Load More Transactions</Button> : "No More Transactions To Show"}
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <AddTransaction show={this.state.modalVisible} hide={() => setModalVisibility(false)}></AddTransaction>
      </div>
    )
  }
}
