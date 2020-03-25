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
      })
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
      })};
      evt.target.firstName.value = "";
      evt.target.lastName.value = "";
    }
  };

  return (
    <>
      <form onSubmit={constructNewChild}>
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
            <button type="submit">Find your Child</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default ParentForm;
