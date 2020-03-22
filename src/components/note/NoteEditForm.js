import React, { useState, useEffect } from "react"
import NoteManager from "../../modules/NoteManager"

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
        <div className="formgrid">
            <label htmlFor="note">Note:</label>
            <textarea
              rows="10"
              cols="75"
              onChange={handleNoteChange}
              id="note"
              value={note.note}
            />
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingNote}
            >
              Save Changes
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default NoteEditForm