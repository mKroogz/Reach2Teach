import React, { useState } from "react";
import NoteManager from "../../modules/NoteManager";
import { Row, Textarea } from "react-materialize";
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
          <div>
            <a
              className="waves-effect waves-light btn"
              onClick={() => props.history.push("/notes")}
            >
              <i className="material-icons left">fast_rewind</i>Back
            </a>
          </div>
          <Row>
              <Textarea
                onChange={handleFieldChange}
                id="note"
                label="Write Note here..."
                l={12}
                m={12}
                s={12}
                xl={12}
              />
            </Row>
          <div className="row">
            <a
              className="col s4 push-s1 btn waves-effect waves-light teal darken-1"
              disabled={isLoading}
              onClick={constructPublicNote}
            >
              <i className="material-icons right">lock_open</i>Make Public Note
            </a>

            <a
              className="col s4 push-s3 btn waves-effect waves-light deep-purple darken-2"
              disabled={isLoading}
              onClick={constructPrivateNote}
            >
              <i className="material-icons right amber-text">lock</i>Make Private Note
            </a>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default NoteForm;
