import React, { useState } from "react";
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
        if (user.userName === register.userName || user.email === register.email) {
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
              props.setUser(newCred, users.length, "Teacher");
            } else {
              props.setUser(newCred, users.length, "Parent");
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
          <div className="formgrid">
            <label htmlFor="inputUserName">Username: </label>
            <input
              onChange={handleRegFieldChange}
              type="userName"
              id="userName"
              placeholder="Username"
              required=""
              autoFocus=""
            />
            <label htmlFor="inputEmail">Email: </label>
            <input
              onChange={handleRegFieldChange}
              type="email"
              id="email"
              placeholder="Email"
              required=""
            />

            <label htmlFor="inputFirstName">First Name: </label>
            <input
              onChange={handleRegFieldChange}
              type="firstName"
              id="firstName"
              placeholder="First Name"
              required=""
            />

            <label htmlFor="inputLastName">Last Name: </label>
            <input
              onChange={handleRegFieldChange}
              type="lastName"
              id="lastName"
              placeholder="Last Name"
              required=""
            />
          </div>
          <button onClick={typeTeacher} type="submit" id="isAdmin">
            Register as Teacher
          </button>
          <button onClick={typeParent} type="submit" id="isAdmin">
            Register as Parent
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Registration;
