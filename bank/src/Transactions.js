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
                    let amt = props.data[key]["amount"];
                    if (props.data[key]["sender"] !== props.data[key]["recipient"]){
                        if (props.data[key]["sender"] === currUser){
                            amt *= -1;
                        }
                    }
                    return (
                        <tr>
                            {/* <th>{"sender" in props.data[key] ? props.data[key]["sender"] : props.data[key]["recipient"]}</th> */}
                            <th>{props.data[key]["sender"] !== props.data[key]["recipient"] ? props.data[key]["sender"] + " → " + props.data[key]["recipient"] : "Bank Transfer"}</th>
                            <th>{props.data[key]["description"]}</th>
                            <th>{props.data[key]["date"]}</th>
                            <th style={{color: amt < 0 ? 'red' : 'green'}} >{amt < 0 ? "-" : "+"}${Math.abs(amt)}</th>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default Transactions;