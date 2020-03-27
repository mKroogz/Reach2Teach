import React from "react";

const LessonCard = props => {
  return (
    <div className="col s2 card cyan lighten-5 hoverable" style={{
      marginRight: "10%"
    }}>
      <div className="card-content">
        <h3>
          <span className="card-title">{props.lesson.title}</span>
        </h3>
        <h4>{props.lesson.date}</h4>
        <div className="card-action">
        <a
          className = "teal-text lighten-2"
          onClick={() => props.history.push(`/lessons/${props.lesson.id}`)}
        >
          Manage
        </a>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
