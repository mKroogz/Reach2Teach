import React, { useState, useEffect } from "react";
import TeacherEditForm from "./TeacherEditForm";

const TeacherStudentCard = props => {
  const [isEdit, setIsEdit] = useState(true);

  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    changeEdit();
  }, []);

  return isEdit ? (
    <TeacherEditForm
      key={props.student.id}
      student={props.student}
      getStudents={props.getStudents}
      changeEdit={changeEdit}
      {...props}
    />
  ) : (
    <div className="card">
      <div className="card-content">
        <strong>
          <span className="card-name">
            {props.student.firstName} {props.student.lastName}{" "}
          </span>
        </strong>
        <button type="button" onClick={changeEdit}>Edit</button>
        <button
          type="button"
          onClick={() => {
            props.deleteStudent(props.student.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TeacherStudentCard;
