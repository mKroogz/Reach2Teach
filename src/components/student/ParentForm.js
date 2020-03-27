import React, { useState } from "react";
import StudentManager from "../../modules/StudentManager";
import ParentManager from "../../modules/ParentManager";

const ParentForm = props => {
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

  const constructNewChild = evt => {
    let match = false;
    let alreadyClaimed = false;
    let childId = 0;
    evt.preventDefault();
    if (student.firstName === "" || student.lastName === "") {
      window.alert("Please fully fill out student name");
    } else {
      props.students.map(child => {
        if (
          child.student.firstName === student.firstName &&
          child.student.lastName === student.lastName
        ) {
          alreadyClaimed = true;
          window.alert("You already have this student in your list");
        }
      });
      if (!alreadyClaimed) {
        StudentManager.getAll().then(allStudents => {
          allStudents.map(child => {
            if (
              child.firstName === student.firstName &&
              child.lastName === student.lastName
            ) {
              match = true;
              childId = child.id;
            }
          });
          if (match) {
            const newStudentParent = {
              studentId: childId,
              userId: student.userId
            };
            ParentManager.post(newStudentParent).then(props.getMyStudents);
          } else {
            window.alert(
              "Your student was not found. Please try again or contact their teacher to add them"
            );
          }
        });
      }
      evt.target.firstName.value = "";
      evt.target.lastName.value = "";
    }
  };

  return (
    <>
      <form onSubmit={constructNewChild}>
        <fieldset>
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
            Find Child
          </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default ParentForm;
