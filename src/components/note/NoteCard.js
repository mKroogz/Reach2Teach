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
    <div className="row">
    <div className="col s4 push-s3 card lime lighten-5 hoverable" style={{
      marginRight: "10%"
    }}>
      <div className="card-content">
        <h3>{date}</h3>
        <p>
          {props.note.note}
        </p>
        {props.isTeacher ? <div className="card-action">
        <a
          className="amber-text lighten-2"
          onClick={() => props.history.push(`/notes/${props.note.id}/edit`)}
        >
          Edit
        </a>
        <a
          className="red-text"
          onClick={() => props.deleteNote(props.note.id)}
        >
          Delete
        </a> 
        </div>: null}
      </div>
    </div>
    </div>
  );
};

export default NoteCard;
