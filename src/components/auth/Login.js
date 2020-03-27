import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserManager from "../../modules/UserManager";

const Login = props => {
  const [credentials, setCredentials] = useState({
    userName: ""
  });

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleLogin = e => {
    e.preventDefault();
    let valid = false;
    UserManager.getAll().then(users => {
      users.map(user => {
        if (user.userName === credentials.userName) {
          valid = true;
          if (user.isAdmin) {
            props.setUser(credentials, user.id, 1);
          } else {
            props.setUser(credentials, user.id, 0);
          }
          props.history.push("/");
        }
      });
      if (!valid) {
        alert("Username not found. Please try again.");
      }
    });
  };

  return (
    <>
      <div className="section">
        <form onSubmit={handleLogin}>
          <fieldset>
            <h3>Welcome back</h3>
            <div className="input-field">
              <input onChange={handleFieldChange} id="userName" type="text" className="validate" />
              <label for="userName">Username</label>
            </div>
            <button
              className="btn waves-effect waves-light teal lighten-2"
              type="submit"
              name="action"
            >
              Let's get to planning
              <i className="material-icons right">fast_forward</i>
            </button>
          </fieldset>
        </form>
        <Link className="nav-link" to="/register">
          Don't have an account? Click here to register!
        </Link>
      </div>
    </>
  );
};

export default Login;
