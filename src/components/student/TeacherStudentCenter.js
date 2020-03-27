import React, { useState, useEffect } from "react";
import TeacherStudentCard from "./TeacherStudentCard";
import TeacherForm from "./TeacherForm";
import TeacherCurrentStudent from "./TeacherCurrentStudent";
import StudentManager from "../../modules/StudentManager";

const TeacherStudentCenter = props => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({
    firstName: "",
    lastName: "",
    id: Number(sessionStorage.getItem("current"))
  });

  const getCurrentStudent = () => {
    const currentId = Number(sessionStorage.getItem("current"));
    let newStudentObj = {
      firstName: "None",
      lastName: "Selected",
      id: currentId
    };
    return currentId
      ? StudentManager.get(currentId).then(currentStudent => {
          newStudentObj = {
            firstName: currentStudent.firstName,
            lastName: currentStudent.lastName,
            id: currentId
          };
          setCurrentStudent(newStudentObj);
        })
      : setCurrentStudent(newStudentObj);
  };

  const getStudents = () => {
    return StudentManager.getAll().then(allStudents => {
      const myStudents = allStudents.filter(
        student => Number(sessionStorage.getItem("id")) === student.userId
      );
      setStudents(myStudents);
    });
  };

  const deleteStudent = id => {
    if (id === Number(sessionStorage.getItem("current"))) {
      sessionStorage.setItem("current", 0)
      StudentManager.delete(id).then(getStudents).then(getCurrentStudent)
    } else {
      StudentManager.delete(id).then(getStudents)
    }
  };

  useEffect(() => {
    getStudents();
    getCurrentStudent();
  }, []);

  return (
    <>
      <h2>Make a New Student:</h2>
      <div>
        <TeacherForm key={1} getStudents={getStudents} {...props} />
      </div>
      <h2>Your Current Student:</h2>
      <div className="hoverable">
        <TeacherCurrentStudent
          key={1}
          currentStudent={currentStudent}
          {...props}
        />
      </div>
      <h2>Manage Students:</h2>
      <div className="container-cards">
        {students.map(student => (
          <TeacherStudentCard
            key={student.id}
            student={student}
            getStudents={getStudents}
            getCurrentStudent={getCurrentStudent}
            deleteStudent={deleteStudent}
            {...props}
          />
        ))}
      </div>
    </>
  );
};
export default TeacherStudentCenter;
