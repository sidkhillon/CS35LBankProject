import { auth } from "./backend/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-bootstrap";
import React from "react"


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
    event.preventDefault();
    if (this.state.password !== this.state.confirm){
      return this.setState({error: "Passwords Do Not Match"});
    }
    this.setState({error: ""});
    this.setState({loading: true});
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password).then((userCredential) => {
      const user = userCredential.user;
      console.log(`Created user ${user}`);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log (`Error code ${errorCode} with message ${errorMessage}`);
      this.setState({error: "Ran into an issue creating account"});
    });
    this.setState({loading: false});
  }

  render() {
    return(
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={this.handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
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
          </div>
        </form>  
      </div>
    );
  }
}
/*
function Signup(props) {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              className="form-control mt-1"
              placeholder="Confirm password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={AuthSignup(this.form.email.value, this.form.password.value)}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
*/

export default SignupForm;