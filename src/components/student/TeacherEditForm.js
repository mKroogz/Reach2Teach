import React, { useState, useEffect } from "react";
import StudentManager from "../../modules/StudentManager";

const TeacherEditForm = props => {
  const [existingStudent, setExistingStudent] = useState({
    firstName: "",
    lastName: "",
    userId: Number(sessionStorage.getItem("id"))
  });

  const handleFieldChange = evt => {
    const stateToChange = { ...existingStudent };
    stateToChange[evt.target.id] = evt.target.value;
    setExistingStudent(stateToChange);
  };

  const updateExistingStudent = evt => {
    evt.preventDefault()

    const editedStudent = {
      id: props.student.id,
      firstName: existingStudent.firstName,
      lastName: existingStudent.lastName,
      userId: existingStudent.userId
    };

    StudentManager.update(editedStudent).then(props.getStudents).then(props.getCurrentStudent).then(props.changeEdit)
  }

  useEffect(() => {
    StudentManager.get(props.student.id)
      .then(student => {
        setExistingStudent(student);
      });
  }, []);

  return (
    <>
      <form onSubmit={updateExistingStudent}>
        <fieldset>
          <div className="formgrid">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="firstName"
              value={existingStudent.firstName}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="lastName"
              value={existingStudent.lastName}
            />
          </div>
          <div className="alignRight">
            <button className="btn-flat waves-effect" type="submit">
              Save Changes
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default TeacherEditForm;
