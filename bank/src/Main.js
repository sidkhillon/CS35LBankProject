import React, { Component } from 'react'
import Transactions from "./Transactions"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

export default class Main extends Component {
  render() {
    const test = {
      12319083: { 'date': 'testDate', 'description': 'testDesc', 'category': 'testCat', 'amount': 123 },
      12319084: { 'date': 'testDate', 'description': 'testDesc', 'category': 'testCat', 'amount': 124 },
      12319085: { 'date': 'testDate', 'description': 'testDesc', 'category': 'testCat', 'amount': 125 },
      12319086: { 'date': 'testDate', 'description': 'testDesc', 'category': 'testCat', 'amount': 126 }
    }
    return (
      <div>
        <Container>
          <Form className="d-flex">
            <Form.Control type='search' placeholder='search' />
            <Button>Search</Button>
          </Form>
          <Transactions data={test} />
        </Container>
      </div>
    )
  }
}
