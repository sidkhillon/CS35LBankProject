import React from "react";
import { Alert } from "react-bootstrap";
import addMoney from "./backend/addMoney";

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
        await addMoney(Number(this.state.amount)).then((r) => {
          this.setState({error: "Success"});
        }).catch((e) => {
          this.setState({error: String(e)})
        });
        await this.timeout(500)
        if (this.state.error === "Success") {
          await this.timeout(500)
          window.location = '/';
        }
    }

    timeout(delay) {
      return new Promise( res => setTimeout(res, delay) );
    }

    render() {
        return(
            <div className="Auth-form-container">
              <form className="Auth-form" onSubmit={this.handleSubmit}>
                <div className="Auth-form-content">
                  <h3 className="Auth-form-title">Input Amount to Deposit</h3>
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