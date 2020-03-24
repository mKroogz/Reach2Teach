import React from "react";

const TeacherCurrentStudent = props => {
  return (
    <>
      <div className="card">
        <div className="card-content">
          <strong>
            <span className="card-name">
              {props.currentStudent.firstName} {props.currentStudent.lastName}
            </span>
          </strong>
        </div>
      </div>
    </>
  );
};
export default TeacherCurrentStudent;
