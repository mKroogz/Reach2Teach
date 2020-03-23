import React from "react";

const LessonCard = props => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          <span className="card-title">{props.lesson.title}</span>
        </h3>
        <h4>{props.lesson.date}</h4>
        <button
          type="button"
          onClick={() => props.history.push(`/lessons/${props.lesson.id}`)}
        >
          Manage Plan
        </button>
      </div>
    </div>
  );
};

export default LessonCard;
