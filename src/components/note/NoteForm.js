import React, { useState } from "react";
import NoteManager from "../../modules/NoteManager";
import moment from "moment";

const NoteForm = props => {
  const [note, setNote] = useState({
    isPrivate: "",
    note: "",
    date: "",
    studentId: Number(sessionStorage.getItem("current"))
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...note };
    stateToChange[evt.target.id] = evt.target.value;
    setNote(stateToChange);
  };

  const constructPublicNote = evt => {
    evt.preventDefault();
    const stateToChange = { ...note };
    stateToChange["isPrivate"] = false;
    setNote(stateToChange);
    if (note.note === "") {
      window.alert("Notes can not be blank");
    } else {
      if (
        window.confirm("Parents will be able to see this note.  Is that ok?")
      ) {
        stateToChange["date"] = moment().format("YYYY-MM-DD");
        setIsLoading(true);
        NoteManager.post(stateToChange).then(() =>
          props.history.push("/notes")
        );
      }
    }
  };

  const constructPrivateNote = evt => {
    evt.preventDefault();
    const stateToChange = { ...note };
    stateToChange["isPrivate"] = true;
    setNote(stateToChange);
    if (note.note === "") {
      window.alert("Notes can not be blank");
    } else {
      if (
        window.confirm("Only you will be able to see this note.  Is that ok?")
      ) {
        stateToChange["date"] = moment().format("YYYY-MM-DD");
        setIsLoading(true);
        NoteManager.post(stateToChange).then(() =>
          props.history.push("/notes")
        );
      }
    }
  };

  return (
    <>
      <form>
        <fieldset>
        <div className="Back">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => props.history.push("/notes")}
            >
              Go Back
            </button>
          </div>
          <div className="formgrid">
            <label htmlFor="note">Note:</label>
            <textarea
              rows="10"
              cols="75"
              onChange={handleFieldChange}
              id="note"
              placeholder="Type out your note here"
            />
          </div>
          <div className="Public">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructPublicNote}
            >
              Make Public Note
            </button>
          </div>
          <div className="Private">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructPrivateNote}
            >
              Make Private Note
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default NoteForm;
