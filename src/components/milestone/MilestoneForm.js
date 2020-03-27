import React, { useState, useEffect } from "react";
import MilestoneManager from "../../modules/MilestoneManager";

const MilestoneForm = props => {
  const [isAdding, setIsAdding] = useState(true);
  const [milestone, setMilestone] = useState({
    milestone: "",
    completeDate: "",
    studentId: Number(sessionStorage.getItem("current"))
  });

  const changeAdding = () => {
    setIsAdding(!isAdding);
  };

  useEffect(() => {
    changeAdding();
  }, []);

  const handleFieldChange = evt => {
    const stateToChange = { ...milestone };
    stateToChange[evt.target.id] = evt.target.value;
    setMilestone(stateToChange);
  };

  const constructNewMilestone = evt => {
    evt.preventDefault();
    if(milestone.milestone){
    MilestoneManager.post(milestone).then(props.getMilestones);
    changeAdding();
    } else {
      window.alert("Must have something in the milestone field")
    }
  };

  return isAdding ? (
    <>
      <form onSubmit={constructNewMilestone}>
        <fieldset>
          <a className="waves-effect waves-light btn blue-grey lighten-3 black-text" onClick={changeAdding}>
            <i className="material-icons left">fast_rewind</i>Back
          </a>
          
          <div className="input-field">
              <input
                onChange={handleFieldChange}
                id="milestone"
                type="text"
                className="validate"
              />
              <label for="milestone">Milestone</label>
          </div>
            <button className="waves-effect waves-light btn blue-grey lighten-3 black-text" type="submit">Save</button>
        </fieldset>
      </form>
    </>
  ) : (
    <a className="waves-effect waves-light btn blue-grey lighten-3 black-text" onClick={changeAdding}>
      New Milestone
    </a>
  );
};

export default MilestoneForm;
