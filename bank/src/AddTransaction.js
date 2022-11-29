import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert } from "react-bootstrap";
import getUserByEmail from './backend/getUserByEmail';
import transaction from './backend/transaction';

function AddTransaction(props) {
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const amount = form.amount.value;
    const recipientEmail = form.recipient.value;
    const desc = form.desc.value;
    const recipientUID = await getUserByEmail(recipientEmail);
    if (!recipientUID) {
        setError("No user with that email address");
        return;
    }
    await transaction(recipientUID, desc, Number(amount)).then(async (r) => {
        setError("Success");
        await timeout(1000);
        props.hide();
    }).catch((e) => {
        setError(String(e));
    });
  };
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }
  return (
    <Modal show = {props.show} onHide= {props.hide}>
        { error && <Alert variant="danger">{error}</Alert> }
        <Modal.Header closeButton>
          <Modal.Title>Add a Transaction</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.FloatingLabel label="Amount">
                        <Form.Control type="number" name="amount" min="0" step="0.01" autoFocus/>
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <Form.FloatingLabel label="Recipient">
                        <Form.Control name="recipient" type="email"/>
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="desc" as="textarea" rows={3}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit">Submit</Button>
            </Modal.Footer>
        </Form>
    </Modal>

  )
}

export default AddTransaction