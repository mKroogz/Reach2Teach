import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import NoteManager from "../../modules/NoteManager";

const NoteList = props => {
  const [notes, setNotes] = useState([]);
  const student = Number(sessionStorage.getItem("current"));

  const getNotes = () => {
    if (student) {
      return NoteManager.getAll().then(allNotes => {
        const myNotes = allNotes.filter(note => student === note.studentId);
        setNotes(myNotes);
      });
    }
  };

  const pushToStudentCenter = () => {
    window.alert("Select a Student from the Student Center to begin planning");
    props.history.push("/students");
  };

  const deleteNote = id => {
    NoteManager.delete(id).then(() => getNotes());
  };

  useEffect(() => {
    getNotes();
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
            props.history.push("/notes/new");
          }}
        >
          Write New Note
        </button>
      </section>
      <div className="container-cards">
        {notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            {...props}
          />
        ))}
      </div>
    </>
  );
};
export default NoteList;
