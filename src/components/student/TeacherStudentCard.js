import React from "react";

const TeacherStudentCard = props => {
  return (
    <div className="card">
      <div className="card-content">
          <strong><span className="card-name" >{props.student.firstName} {props.student.lastName}   </span></strong>
        <button type="button">Edit</button>
        <button type="button" onClick={() => {props.deleteStudent(props.student.id)}}>Delete</button>
      </div>
    </div>
  );
};

export default TeacherStudentCard;
