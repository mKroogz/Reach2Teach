import React, { useState, useEffect } from "react";
import ParentStudentCard from "./ParentStudentCard";
import ParentForm from "./ParentForm";
import ParentCurrentStudent from "./ParentCurrentStudent";
import StudentManager from "../../modules/StudentManager";
import ParentManager from "../../modules/ParentManager";

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

  const getMyStudents = () => {
    return ParentManager.getAllStudentInfo().then(allParentsStudents => {
      const myStudents = allParentsStudents.filter(
        student => Number(sessionStorage.getItem("id")) === student.userId
      );
      setStudents(myStudents);
    });
  };

  const deleteChild = (id, studentId) => {
    if (studentId === Number(sessionStorage.getItem("current"))) {
      sessionStorage.setItem("current", 0)
      ParentManager.delete(id).then(getMyStudents).then(getCurrentStudent)
    } else {
      ParentManager.delete(id).then(getMyStudents)
    }
  };

  useEffect(() => {
    getMyStudents();
    getCurrentStudent();
  }, []);

  return (
    <>
      <h2>Claim your Child:</h2>
      <div>
        <ParentForm key={1} students={students} getMyStudents={getMyStudents} {...props} />
      </div>
      <h2>Your Current Child:</h2>
      <div className="hoverable">
        <ParentCurrentStudent 
          key={1}
          currentStudent={currentStudent}
          {...props}
        />
      </div>
      <h2>Manage Children:</h2>
      <div className="container-cards">
        {students.map(student => (
          <ParentStudentCard
            key={student.id}
            relationId={student.id}
            student={student.student}
            getMyStudents={getMyStudents}
            getCurrentStudent={getCurrentStudent}
            deleteChild={deleteChild}
            {...props}
          />
        ))}
      </div>
    </>
  );
};
export default TeacherStudentCenter;
