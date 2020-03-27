import React from "react";

const TeacherCurrentStudent = props => {
  return (
    <>
      <div className="card">
        <div className="card-content row">
          <strong>
            <span className="card-name col">
              {props.currentStudent.firstName} {props.currentStudent.lastName}
            </span>
          </strong>
        </div>
      </div>
    </>
  );
};
export default TeacherCurrentStudent;
