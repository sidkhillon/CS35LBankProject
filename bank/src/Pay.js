import React from 'react'
import moneylogo from "./assets/moneytransfer.png"
import { Alert } from "react-bootstrap";
import getUserByEmail from "./backend/getUserByEmail";
import transaction from "./backend/transaction";

class Pay extends React.Component {
    constructor(props) {
      super(props);
      this.state = {email: '', amount: "", note: "", error: ''}
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
      const toUID = await getUserByEmail(this.state.email);
      await transaction(toUID, this.state.note, Number(this.state.amount)).then((r) => {
        this.setState({error: "Success"});
      }).catch((e) => {
        this.setState({error: String(e)})
      });
      await this.timeout(500)
      if (this.state.error == "Success") {
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
                  <h3 className="Auth-form-title">Send Money
                    <img src = {moneylogo} height = "40"/>
                  </h3>
                  { this.state.error && <Alert variant="danger">{this.state.error}</Alert> }
                  <div className="form-group mt-3">
                    <label>To:</label>
                    <input 
                      type="email"
                      name="email"
                      className="form-control mt-1"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
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
                  <div className="form-group mt-3">
                    <label>Note:</label>
                    <input 
                      type="text"
                      name="note"
                      className="form-control mt-1"
                      value={this.state.note}
                      onChange={this.handleChange}
                    />
                  </div>
                <div className="d-grid gap-2 mt-3">
                  <input type="submit" disabled={this.state.loading} className="btn btn-primary" value="Submit" />
                </div>
                </div>
              </form>  
            </div>

        // <div className="Auth-form-container">
        //   <form className="Auth-form">
        //     <div className="Auth-form-content">
              // <h3 className="Auth-form-title">Send Money 
              //   <img src = {moneylogo} height = "40"/>
              // </h3>
        //       <p className = "note">Transfer money to your friends!</p> 
        //       <div className="form-group mt-3">
        //         <label>User</label>
        //         <input 
        //           type="email"
        //           name="email"
        //           className="form-control mt-1"
        //         />
        //       </div>
        //       <div className="form-group mt-3">
        //         <label>Amount</label>
        //         <input
        //           type="number"
        //           name="number"
        //           className="form-control mt-1"
        //         />
        //       </div>
        //       <div className="form-group mt-3">
        //         <label>Note</label>
        //         <input
        //           type="number"
        //           name="number"
        //           className="form-control mt-1"
        //         />
        //       </div>
        //     <div className="d-grid gap-2 mt-3">
        //       <input type="submit" className="btn btn-primary" value="Pay" />
        //     </div>
        //     </div>
        //   </form>  
        // </div>
      );
    }
  }

  export default Pay;