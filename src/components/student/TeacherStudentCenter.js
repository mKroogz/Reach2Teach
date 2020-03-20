import React, { useState, useEffect } from "react";
import TeacherStudentCard from "./TeacherStudentCard";
import TeacherForm from "./TeacherForm";
import StudentManager from "../../modules/StudentManager";

const TeacherStudentCenter = props => {
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    return StudentManager.getAll().then(allStudents => {
      const myStudents = allStudents.filter(
        student => Number(sessionStorage.getItem("id")) === student.userId
      );
      setStudents(myStudents);
    });
  };

  const deleteStudent = id => {
    StudentManager.delete(id).then(getStudents);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <h2>Make a new Student:</h2>
      <div>
        <TeacherForm key={1} getStudents={getStudents} {...props} />
      </div>
      <h2>Manage Students:</h2>
      <div className="container-cards">
        {students.map(student => (
          <TeacherStudentCard
            key={student.id}
            student={student}
            getStudents={getStudents}
            deleteStudent={deleteStudent}
            {...props}
          />
        ))}
      </div>
    </>
  );
};
export default TeacherStudentCenter;
