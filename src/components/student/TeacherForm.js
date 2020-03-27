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
      StudentManager.post(student).then(props.getStudents);
      evt.target.firstName.value = "";
      evt.target.lastName.value = "";
    }
  };

  return (
    <>
      <form onSubmit={constructNewStudent}>
          <div className="formgrid">
            <div className="row">
              <div className="input-field col s4">
                <input
                  onChange={handleFieldChange}
                  id="firstName"
                  type="text"
                  className="validate"
                />
                <label for="firstName">First Name</label>
              </div>
              <div className="input-field col s4">
                <input
                  onChange={handleFieldChange}
                  id="lastName"
                  type="text"
                  className="validate"
                />
                <label for="lastName">Last Name</label>
              </div>
                <button
                  className="col btn-large waves-effect waves-light blue-grey darken-4"
                  type="submit"
                  name="action"
                >
                  Add Student
                </button>
            </div>
          </div>
      </form>
    </>
  );
};

export default TeacherForm;
