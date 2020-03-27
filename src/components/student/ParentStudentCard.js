import React from "react";

const ParentStudentCard = props => {
  const selectCurrentStudent = () => {
    sessionStorage.setItem("current", props.student.id)
    props.getCurrentStudent()
  }

  return (
    <div className="card">
      <div className="card-content hoverable row">
        <i
          onClick={() => {
            props.deleteChild(props.relationId, props.student.id);
          }}
          className="col material-icons left"
        >
          delete
        </i>        
        <strong>
          <span className={"col s2"}>
            {props.student.firstName} {props.student.lastName}
          </span>
        </strong>
        <a
          onClick={selectCurrentStudent}
          className="col btn-small waves-effect waves-light blue-grey darken-4"
        >
          Select
        </a>
      </div>
    </div>
  );
};

export default ParentStudentCard;
