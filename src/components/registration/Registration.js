import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserManager from "../../modules/UserManager";

const Registration = props => {
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    isAdmin: true
  });

  const typeTeacher = evt => {
    const teacherToChange = { ...register };
    teacherToChange[evt.target.id] = true;
    setRegister(teacherToChange);
  };

  const typeParent = evt => {
    const parentToChange = { ...register };
    parentToChange[evt.target.id] = false;
    setRegister(parentToChange);
  };

  const handleRegFieldChange = evt => {
    const stateToChange = { ...register };
    stateToChange[evt.target.id] = evt.target.value;
    setRegister(stateToChange);
  };

  const handleReg = e => {
    e.preventDefault();
    let valid = true;
    UserManager.getAll().then(users => {
      users.map(user => {
        if (
          user.userName === register.userName ||
          user.email === register.email
        ) {
          valid = false;
          alert("Username or email already in database");
        }
      });
      if (
        register.userName === "" ||
        register.email === "" ||
        register.firstName === "" ||
        register.lastName === ""
      ) {
        valid = false;
        alert("Please Fill in all fields");
      }
      if (valid) {
        props.history.push("/");
        const newUser = {
          userName: register.userName,
          email: register.email,
          firstName: register.firstName,
          lastName: register.lastName,
          isAdmin: register.isAdmin
        };
        UserManager.post(newUser)
          .then(UserManager.getAll)
          .then(users => {
            const newCred = {
              userName: register.userName
            };
            if (register.isAdmin) {
              props.setUser(newCred, users.length, 1);
            } else {
              props.setUser(newCred, users.length, 0);
            }
          });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleReg}>
        <fieldset>
          <h3>Make a new account</h3>
          <div>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={handleRegFieldChange}
                type="text"
                id="userName"
                required
              />
              <label for="userName">Username </label>
            </div>
            </div>
            <div className="row">
            <div className="input-field col s12">
              <input
                onChange={handleRegFieldChange}
                type="email"
                id="email"
                required
              />
              <label for="email">Email </label>
            </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input onChange={handleRegFieldChange} id="firstName" type="text" className="validate" />
                <label for="firstName">First Name</label>
              </div>
              <div className="input-field col s6">
                <input onChange={handleRegFieldChange} id="lastName" type="text" className="validate" />
                <label for="lastName">Last Name</label>
              </div>
            </div>
          </div>
          <div className="row">
          <button
              className="col s4 push-s1 btn waves-effect waves-light teal lighten-1"
              onClick={typeTeacher}
              type="submit"
              name="action"
              id="isAdmin"
            >
              <a href="#" className="brand-logo">
          <img
            src="https://www.svgrepo.com/show/105825/educational-book-and-apple-for-the-teacher.svg"
            alt="Teacher Icon"
            width="30px"
          ></img>
        </a>
              Register as Teacher
            </button>
          <button
              className="col s4 push-s3 btn waves-effect waves-light deep-purple lighten-2"
              onClick={typeParent}
              type="submit"
              name="action"
              id="isAdmin"
            >
              <a href="#" className="brand-logo">
          <img
            src="https://www.svgrepo.com/show/236138/fatherhood-parenthood.svg"
            alt="Parent Icon"
            height="29px"
            width="36px"
          ></img>
        </a>
              Register as Parent
            </button>
            </div>
        </fieldset>
      </form>
      <Link className="nav-link" to="/login">
        Already have an account? Click here to log in!
      </Link>
    </>
  );
};

export default Registration;
