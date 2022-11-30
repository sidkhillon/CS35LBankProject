import React from 'react'
import Table from 'react-bootstrap/Table'

function Transactions(props) {
    const currUser = props.data[1];
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
                {Object.keys(props.data[0]).map((key, index) => {
                    return (
                        <tr>
                            {/* <th>{"sender" in props.data[key] ? props.data[key]["sender"] : props.data[key]["recipient"]}</th> */}
                            <th>{props.data[0][key]["sender"] + " → " + props.data[0][key]["recipient"]}</th>
                            <th>{props.data[0][key]["description"]}</th>
                            <th>{props.data[0][key]["date"]}</th>
                            <th style={{color: props.data[0][key]["recipient"] === currUser ? 'green' : 'red'}} >{(props.data[0][key]["recipient"] === currUser) ? "+" : "-"}${props.data[0][key]["amount"]}</th>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default Transactions;