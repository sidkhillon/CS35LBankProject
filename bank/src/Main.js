import React, { Component } from 'react'
import Transactions from "./Transactions"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Main extends Component {
  render() {
    const test = {
      12319083: { 'date': 'testDate', 'description': 'testDesc', 'sender': 'testSend', 'amount': 123 },
      12319084: { 'date': 'testDate', 'description': 'testDesc', 'recipient': 'testRecip', 'amount': 124 },
      12319085: { 'date': 'testDate', 'description': 'testDesc', 'sender': 'testSend2', 'amount': 125 },
      12319086: { 'date': 'testDate', 'description': 'testDesc', 'recipient': 'recipient2', 'amount': 126 }
    }
    return (
      <div>
        <Container>
          <Row style={{ marginTop: "20px" }}>
            <Col></Col>
            <Col xs="auto" >
              <Form className="d-flex">
                <Form.Control type='search' placeholder='search' />
                <Button>Search</Button>
              </Form>
            </Col>
          </Row>
          <Transactions data={test} />
        </Container>
      </div>
    )
  }
}
