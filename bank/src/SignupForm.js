import AuthSignup from "./backend/authentication/AuthSignup";
import { Alert } from "react-bootstrap";
import React from "react";
import signuplogo from "./assets/signup.png";
import { Link } from "react-router-dom";


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', confirm: '', error: '', loading: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const value = event.target.value;
    const name = event.target.name;
    this.setState({[name]: value});
  }
  async handleSubmit(event){
    // Prevents page from reloading on submit
    event.preventDefault();
    // Can't do anything while function is loading
    this.setState({loading: true});
    const err = await AuthSignup(this.state.email, this.state.password, this.state.confirm);
    this.setState({loading: false});
    if (err === null) {
      // If no error, redirect to the main page, as user is logged in
      this.setState({error: 'Success! Welcome to Opes.'});
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
            <h3 className="Auth-form-title">Sign Up
            <img src = {signuplogo} height = "30" className = "signupimage" alt="add_user"/>
              </h3>
            { this.state.error && <Alert variant="danger">{this.state.error}</Alert> }
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
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm"
              className="form-control mt-1"
              value={this.state.confirm}
              onChange={this.handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <input type="submit" disabled={this.state.loading} className="btn btn-primary" value="Submit" />
          </div>
          <div className="d-grid gap-2 mt-3">
            <p>Already have an account? <Link to="/loginform">Login</Link></p>
          </div>
          </div>
        </form>  
      </div>
    );
  }
}

export default SignupForm;