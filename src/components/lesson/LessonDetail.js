import React, { useState, useEffect } from "react";
import LessonManager from "../../modules/LessonManager";

const LessonDetail = props => {
  const [lesson, setLesson] = useState({ title: "", plan: "", studentId: "", date: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    LessonManager.get(props.lessonId).then(lesson => {
      setLesson({
        title: lesson.title,
        plan: lesson.plan,
        studentId: lesson.studentId,
        date: lesson.date,
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
    <div className="card">
      <div className="card-content">
        <h3>
          <span style={{ color: "darkslategrey" }}>{lesson.title}</span>
        </h3>
        <p>{lesson.plan}</p>
        <h4>{lesson.date}</h4>
        <button
          type="button"
          onClick={() => props.history.push(`/lessons/${props.lessonId}/edit`)}
        >
          Edit
        </button>
        <button type="button" disabled={isLoading} onClick={handleDelete}>
          Delete
        </button>
        <button type="button" disabled={isLoading} onClick={() => props.history.push(`/lessons`)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default LessonDetail;