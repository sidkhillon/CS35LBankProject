import React from "react";
import { Alert } from "react-bootstrap";
import addMoney from "./backend/addMoney";
import { getCurrentUID } from "./backend/currentUser";

class DepositMoney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {amount: "", error: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value});
    }

    async handleSubmit(event){
        event.preventDefault();
        const uid = getCurrentUID();
        if (uid !== null){
          this.setState({error: await addMoney(uid, this.state.amount).catch((error) => { return error; })});
        }
        else{
          this.setState({error: "No User is signed in"});
        }
    }

    render() {
        return(
            <div className="Auth-form-container">
              <form className="Auth-form" onSubmit={this.handleSubmit}>
                <div className="Auth-form-content">
                  <h3 className="Auth-form-title">Input Amount to Add</h3>
                  { this.state.error && <Alert variant="danger">{this.state.error}</Alert> }
                  <div className="form-group mt-3">
                    <label>Amount:</label>
                    <input 
                      type="number"
                      step="0.01"
                      name="amount"
                      className="form-control mt-1"
                      value={this.state.amount}
                      onChange={this.handleChange}
                    />
                  </div>
                <div className="d-grid gap-2 mt-3">
                  <input type="submit" disabled={this.state.loading} className="btn btn-primary" value="Submit" />
                </div>
                </div>
              </form>  
            </div>
          );
    }
}

export default DepositMoney;