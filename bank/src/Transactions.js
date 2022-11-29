import React from 'react'
import Table from 'react-bootstrap/Table'

function Transactions(props) {
    const currUser = "Sid"
    return (
        <Table style={{ marginTop: "20px" }} striped bordered responsive>
            <thead>
                <tr>
                    <th>Person</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(props.data).map((key, index) => {
                    return (
                        <tr>
                            {/* <th>{"sender" in props.data[key] ? props.data[key]["sender"] : props.data[key]["recipient"]}</th> */}
                            <th>{props.data[key]["sender"] + " → " + props.data[key]["recipient"]}</th>
                            <th>{props.data[key]["description"]}</th>
                            <th>{props.data[key]["date"]}</th>
                            <th style={{color: props.data[key]["sender"] === currUser ? 'red' : 'green'}} >{(props.data[key]["recipient"] === currUser) ? "+" : "-"}${props.data[key]["amount"]}</th>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default Transactions;