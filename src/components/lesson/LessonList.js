import React, { useState, useEffect } from "react";
import LessonCard from "./LessonCard";
import LessonManager from "../../modules/LessonManager";

const LessonList = props => {
  const [lessonPlans, setLessonPlans] = useState([]);
  const student = Number(sessionStorage.getItem("current"));

  const getLessons = () => {
    return LessonManager.getAll().then(allLessons => {
      const myLessons = allLessons.filter(
        lesson => student === lesson.studentId
      );
      setLessonPlans(myLessons);
    });
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
      <section className="section-content">
        <button
          type="button"
          className="btn"
          onClick={() => {
            props.history.push("/lessons/new");
          }}
        >
          Make New Lesson Plan
        </button>
      </section>
      <div className="container-cards">
        {lessonPlans.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} {...props} />
        ))}
      </div>
    </>
  );
};
export default LessonList;
