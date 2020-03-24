import React from "react";

const ParentStudentCard = props => {
  const selectCurrentStudent = () => {
    sessionStorage.setItem("current", props.student.id)
    props.getCurrentStudent()
  }

  return (
    <div className="card">
      <div className="card-content">
        <strong>
          <span className={"card-name"}>
            {props.student.firstName} {props.student.lastName}
          </span>
        </strong>
        <button type="button" onClick={selectCurrentStudent}>Select</button>
        <button
          type="button"
          onClick={() => {
            props.deleteChild(props.relationId, props.student.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ParentStudentCard;
