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
            props.setUser(credentials, users.length, 1);
          } else {
            props.setUser(credentials, users.length, 0);
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
      <form onSubmit={handleLogin}>
        <fieldset>
          <h3>Welcome back</h3>
          <div className="formgrid">
            <label htmlFor="inputUserName">Username: </label>
            <input
              onChange={handleFieldChange}
              type="userName"
              id="userName"
              placeholder="Username"
              required=""
              autoFocus=""
            />
          </div>
          <button type="submit">Let's get to planning</button>
        </fieldset>
      </form>
      <Link className="nav-link" to="/register">
        Don't have an account? Click here to register!
      </Link>
    </>
  );
};

export default Login;
