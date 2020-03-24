import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import NoteManager from "../../modules/NoteManager";

const NoteList = props => {
  const [notes, setNotes] = useState([]);
  const student = Number(sessionStorage.getItem("current"));
  const isTeacher = Number(sessionStorage.getItem("type"));

  const getNotes = () => {
    if (student) {
      return isTeacher ? (NoteManager.getAll().then(allNotes => {
        const myNotes = allNotes.filter(note => student === note.studentId);
        setNotes(myNotes)
      })) : (
        NoteManager.getAll().then(allNotes => {
          const myNotes = allNotes.filter(note => student === note.studentId && !note.isPrivate);
          setNotes(myNotes)
        })
      )
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
      {isTeacher ? <button
          type="button"
          className="btn"
          onClick={() => {
            props.history.push("/notes/new");
          }}
        >
          Write New Note
        </button>  : null}
      </section>
      <div className="container-cards">
        {notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            isTeacher={isTeacher}
            deleteNote={deleteNote}
            {...props}
          />
        ))}
      </div>
    </>
  );
};
export default NoteList;
