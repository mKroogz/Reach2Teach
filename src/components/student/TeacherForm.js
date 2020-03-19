import React, { useState } from "react";
import StudentManager from "../../modules/StudentManager";

const TeacherForm = props => {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    userId: Number(sessionStorage.getItem("id"))
  });

  const handleFieldChange = evt => {
    const stateToChange = { ...student };
    stateToChange[evt.target.id] = evt.target.value;
    setStudent(stateToChange);
  };

  const constructNewStudent = evt => {
    evt.preventDefault();
    if (student.firstName === "" || student.lastName === "") {
      window.alert("Please fully fill out student name");
    } else {
      StudentManager.post(student).then(props.getStudents)
      evt.target.firstName.value = ""
      evt.target.lastName.value = ""
    }
  };

  return (
    <>
      <form onSubmit={constructNewStudent}>
        <fieldset>
          <div className="formgrid">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="firstName"
              placeholder="First Name"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className="alignRight">
            <button type="submit">
              Create New Student
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default TeacherForm;
