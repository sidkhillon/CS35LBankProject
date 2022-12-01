import React from 'react'
import Table from 'react-bootstrap/Table'




function Transactions(props) {
    const transObject = props.data["transactions"];
    console.log(transObject);
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
                {Object.keys(transObject).reverse().slice(0,props.data["numTrans"]).map((key, index) => {
                    return (
                        <tr>
                            {/* <th>{"sender" in props.data[key] ? props.data[key]["senderName"] : props.data[key]["receiverName"]}</th> */} 
                            <th>{transObject[key]["senderName"] + " → " + transObject[key]["receiverName"]}</th>
                            <th>{transObject[key]["note"]}</th>
                            <th>{transObject[key]["date"]}</th>
                            <th style={{color: transObject[key]["amount"] < 0 ? 'red' : 'green'}} >{(transObject[key]["amount"] < 0) ? "-" : "+"}${Math.abs(transObject[key]["amount"])}</th>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default Transactions;