import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddTransaction(props) {
  return (
    <Modal show = {props.show} onHide= {props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.FloatingLabel label="Amount">
                        <Form.Control type="number" placeholder="12.34" step = "0.01" autofocus/>
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <Form.FloatingLabel label="Date">
                        <Form.Control type="date"/>
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <Form.FloatingLabel label="Recipient">
                        <Form.Control type="text" placeholder='John Doe'/>
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textArea" rows={3}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Submit</Button>
        </Modal.Footer>
    </Modal>

  )
}

export default AddTransaction