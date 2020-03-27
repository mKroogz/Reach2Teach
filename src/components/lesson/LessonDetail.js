import React, { useState, useEffect } from "react";
import LessonManager from "../../modules/LessonManager";

const LessonDetail = props => {
  const [lesson, setLesson] = useState({
    title: "",
    plan: "",
    studentId: "",
    date: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    LessonManager.get(props.lessonId).then(lesson => {
      setLesson({
        title: lesson.title,
        plan: lesson.plan,
        studentId: lesson.studentId,
        date: lesson.date
      });
      setIsLoading(false);
    });
  }, [props.lessonId]);

  const handleDelete = () => {
    setIsLoading(true);
    LessonManager.delete(props.lessonId).then(() =>
      props.history.push("/Lessons")
    );
  };

  return (
    <div className="row">
    <div className="cyan lighten-5 card hoverable col s8">
      <div className="card-content">
        <a
          className="waves-effect waves-light btn"
          onClick={() => props.history.push("/lessons")}
        >
          <i className="material-icons left">fast_rewind</i>Back
        </a>
        <h3>{lesson.title}</h3>
        <p>{lesson.plan}</p>
        <h4>{lesson.date}</h4>
        <div className="card-action">
        <a
          onClick={() => props.history.push(`/lessons/${props.lessonId}/edit`)}
        >
          edit
        </a>
        <a
          className="red-text"
          onClick={handleDelete}
        >
          delete
        </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LessonDetail;
