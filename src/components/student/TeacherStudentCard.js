import React, { useState } from "react";
import TeacherEditForm from "./TeacherEditForm";
import M from "materialize-css";

const TeacherStudentCard = props => {
  const [isEdit, setIsEdit] = useState(false);

  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  const selectCurrentStudent = () => {
    M.toast({
      html: `${props.student.firstName} ${props.student.lastName} selected`
    });
    sessionStorage.setItem("current", props.student.id);
    props.getCurrentStudent();
  };

  return isEdit ? (
    <TeacherEditForm
      key={props.student.id}
      student={props.student}
      getStudents={props.getStudents}
      getCurrentStudent={props.getCurrentStudent}
      changeEdit={changeEdit}
      {...props}
    />
  ) : (
    <div className="card">
      <div className="card-content hoverable row">
        <strong>
          <span className={"col s2"}>
            {props.student.firstName} {props.student.lastName}
          </span>
        </strong>
        <i
          onClick={changeEdit}
          className="waves-effect col material-icons left"
        >
          edit
        </i> 
        <i
          onClick={() => {
            props.deleteStudent(props.student.id);
          }}
          className="col material-icons left"
        >
          delete
        </i>        
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

export default TeacherStudentCard;
