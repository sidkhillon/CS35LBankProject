import { Alert } from "react-bootstrap";
import React from "react"
import { Link } from "react-router-dom";
import AuthSignin from "./backend/authentication/AuthSignin";


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', error: '', loading: false, errorType: 'danger'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const value = event.target.value;
    const name = event.target.name;
    this.setState({[name]: value});
  }
  async handleSubmit(event){
    // Prevents page from reloading
    event.preventDefault();
    // Can't do anything while the function is loading
    this.setState({loading: true});
    const err = await AuthSignin(this.state.email, this.state.password);
    this.setState({loading: false});
    if (err == null) {
      // If no error, redirect to main page, because user is signed in
      this.setState({error: 'Signed In!', errorType: 'success'});
      await this.timeout(1000);
      window.location = '/';
    }
    else {
      this.setState({error: err});
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
            <h3 className="Auth-form-title">Login
              
            </h3>
            { this.state.error && <Alert variant={this.state.errorType}>{this.state.error}</Alert> }
            <div className="form-group mt-3">
              <label>Email Address:</label>
              <input 
                type="email"
                name="email"
                className="form-control mt-1"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mt-3">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <input type="submit" disabled={this.state.loading} className="btn btn-primary" value="Submit" />
          </div>
          <div className="d-grid gap-2 mt-3">
            <p>Need an account? <Link to="/signup">Signup</Link></p>
          </div>
          </div>
        </form>  
      </div>
    );
  }
}
export default LoginForm;