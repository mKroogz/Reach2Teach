import React, { useState, useEffect } from "react"
import NoteManager from "../../modules/NoteManager"
import { Row, Textarea } from "react-materialize";

const NoteEditForm = props => {
  const [note, setNote] = useState({ isPrivate: "", studentId: "", note: "", date: "" });
  const [isLoading, setIsLoading] = useState(true);

  const handleNoteChange = evt => {
    const stateToChange = { ...note };
    stateToChange[evt.target.id] = evt.target.value;
    setNote(stateToChange);
  };

  const updateExistingNote = evt => {
    evt.preventDefault()
    setIsLoading(true);

    const editedNote = {
      id: props.noteId,
      isPrivate: note.isPrivate,
      studentId: note.studentId,
      note: note.note,
      date: note.date
    };

    NoteManager.update(editedNote)
      .then(() => props.history.push("/notes"))
  }

  useEffect(() => {
    NoteManager.get(props.noteId)
      .then(note => {
        setNote(note);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <form>
        <fieldset>
        <Row>
              <Textarea
                onChange={handleNoteChange}
                id="note"
                value={note.note}
                l={12}
                m={12}
                s={12}
                xl={12}
              />
            </Row>
          <div>
            <a
              className = "hoverable btn lime waves-effect waves-teal lighten-4 grey-text text-darken-2"
              disabled={isLoading}
              onClick={updateExistingNote}
            >
              Save
            </a>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default NoteEditForm