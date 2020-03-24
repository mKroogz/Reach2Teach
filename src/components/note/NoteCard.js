import React from "react";

const NoteCard = props => {
  
    const formatDate = () => {
    const dateArray = props.note.date.split("-");
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
        <h2>{date}</h2>
        <p>
          {props.note.note}
        </p>
        {props.isTeacher ? <section className = "buttons">
        <button
          type="button"
          onClick={() => props.history.push(`/notes/${props.note.id}/edit`)}
        >
          Edit Note
        </button>
        <button
          type="button"
          onClick={() => props.deleteNote(props.note.id)}
        >
          Delete Note
        </button> 
        </section>: null}
      </div>
    </div>
  );
};

export default NoteCard;
