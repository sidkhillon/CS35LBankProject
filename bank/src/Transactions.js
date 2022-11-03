import React from 'react'
import Table from 'react-bootstrap/Table'

function Transactions(props) {
    return (
        <Table striped bordered responsive>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.data).map((key, index) => {
                    return (
                        <tr>
                            <th>{props.data[key]["date"]}</th>
                            <th>{props.data[key]["description"]}</th>
                            <th>{props.data[key]["category"]}</th>
                            <th>{props.data[key]["amount"]}</th>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default Transactions;