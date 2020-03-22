import React from "react";

const LessonCard = props => {
  
    const formatDate = () => {
    const dateArray = props.lesson.date.split("-");
    const temp = dateArray[0];
    dateArray[0] = dateArray[1];
    dateArray[1] = dateArray[2];
    dateArray[2] = temp;
    return `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`;
  };

  const date = formatDate();

  return (
    <div className="card">
      <div className="card-content">
        <h3>
          <span className="card-title">{props.lesson.title}</span>
        </h3>
        <h4>{date}</h4>
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
