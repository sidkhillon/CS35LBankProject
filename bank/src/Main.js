import React, { Component } from 'react'
import Transactions from "./Transactions"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AddTransaction from './AddTransaction';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  render() {
    const test = {
      12319083: { 'date': 'testDate', 'description': 'testDesc', 'sender': 'Sid', 'recipient': 'Jackson', 'amount': 123 },
      12319084: { 'date': 'testDate', 'description': 'testDesc', 'sender': 'Jackson', 'recipient': 'Sid', 'amount': 124 },
      12319085: { 'date': 'testDate', 'description': 'testDesc', 'sender': 'Sid', 'recipient': 'Juskeerat', 'amount': 125 },
      12319086: { 'date': 'testDate', 'description': 'testDesc', 'sender': 'Sid', 'recipient': 'Jackson', 'amount': 126 }
    }
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <div style={{display: 'flex', justifyContent: "center"}}>
                <h1>{(currentHrs < 12 ? "Good morning, " : currentHrs < 17 ? "Good afternoon, " : "Good evening, ") + user}</h1>
              </div>
              <div style={{display: 'flex', justifyContent: "center"}}>
                <h3>{"Your balance is $" + bal}</h3>
              </div>
            </Col>
          </Row>
          <hr/>
          <Row style={{ marginTop: "20px" }}>
            <Col></Col>
            <Col xs="auto" >
              <Form className="d-flex">
                <Form.Control type='date'/>
                <Form.Select>
                    <option>Select a User</option>
                    <option value="test">test</option>
                    <option value="test2">test2</option>
                </Form.Select>
                <Button>Search</Button>
              </Form>
            </Col>
          </Row>
          <Transactions data={test} />
          <Row style={{ marginTop: "20px" }}>
            <Col></Col>
            <Col xs="auto" >
              <Button onClick={() => setModalVisibility(true)}>Add a Transaction</Button>
            </Col>
          </Row>
        </Container>
        <AddTransaction show={this.state.modalVisible} hide ={() => setModalVisibility(false)}></AddTransaction>
      </div>
    )
  }
}
