import React, { useState, useEffect } from "react";
import TeacherStudentCard from "./TeacherStudentCard";
import StudentManager from "../../modules/StudentManager";

const TeacherStudentCenter = (props) => {
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    return StudentManager.getAll().then(allStudents => {
      setStudents(allStudents);
    });
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
    <h2>Manage Students:</h2>
    <div className="container-cards">
      {students.map(student => (
        <TeacherStudentCard
          key={student.id}
          student={student}
          {...props}
        />
      ))}
    </div>
    </>
  );
};
export default TeacherStudentCenter;