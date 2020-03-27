import React, { useState, useEffect } from "react";
import LessonCard from "./LessonCard";
import LessonManager from "../../modules/LessonManager";
import { Button } from "react-materialize";

const LessonList = props => {
  const [lessonPlans, setLessonPlans] = useState([]);
  const student = Number(sessionStorage.getItem("current"));

  const getLessons = () => {
    if (student) {
      return LessonManager.getAll().then(allLessons => {
        const myLessons = allLessons.filter(
          lesson => student === lesson.studentId
        );
        setLessonPlans(myLessons);
      });
    }
  };

  const pushToStudentCenter = () => {
    window.alert("Select a Student from the Student Center to begin planning");
    props.history.push("/students");
  };

  useEffect(() => {
    getLessons();
  }, []);

  return !student ? (
    <div onClick={pushToStudentCenter()}>Loading...</div>
  ) : (
    <>
      <div className="section center"> 
        <Button
          node="button"
          style={{
            marginRight: "5px"
          }}
          waves="light"
          onClick={() => {
            props.history.push("/lessons/new");
          }}
        >
          Add New Lesson
        </Button>
      </div>
      <div className="container-cards row">
        {
          (lessonPlans.sort((a, b) => {
            if (a.date < b.date) {
              return -1;
            } else if (a.date > b.date) {
              return 1;
            } else {
              return 0;
            }
          }),
          lessonPlans.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} {...props} />
          )))
        }
      </div>
    </>
  );
};
export default LessonList;
