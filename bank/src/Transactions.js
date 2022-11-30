import React from 'react'
import Table from 'react-bootstrap/Table'




function Transactions(props) {
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
                            {/* <th>{"sender" in props.data[key] ? props.data[key]["senderName"] : props.data[key]["receiverName"]}</th> */} 
                            <th>{props.data[key]["senderName"] + " → " + props.data[key]["receiverName"]}</th>
                            <th>{props.data[key]["note"]}</th>
                            <th>{props.data[key]["date"]}</th>
                            <th style={{color: props.data[key]["amount"] > 0 ? 'green' : 'red'}} >{(props.data[key]["amount"] > 0) ? "+" : "-"}${Math.abs(props.data[key]["amount"])}</th>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default Transactions;