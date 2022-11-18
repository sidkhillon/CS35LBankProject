import React from 'react'

class Pay extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return(
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Send Money</h3>
              <div className="form-group mt-3">
                <label>User</label>
                <input 
                  type="email"
                  name="email"
                  className="form-control mt-1"
                />
              </div>
              <div className="form-group mt-3">
              <label>Amount</label>
              <input
                type="number"
                name="number"
                className="form-control mt-1"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <input type="submit" className="btn btn-primary" value="Send" />
            </div>
            </div>
          </form>  
        </div>
      );
    }
  }

  export default Pay;
