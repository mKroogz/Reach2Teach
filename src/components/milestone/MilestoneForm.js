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
      MilestoneManager.post(milestone).then(props.getMilestones);
      changeAdding();
  };

  return isAdding ? (
    <>
      <form onSubmit={constructNewMilestone}>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="milestone"
              placeholder=" New Milestone Here"
            />
            <button type="submit">Save</button>
          </div>
          <button type="button" onClick={changeAdding}>Go Back</button>
        </fieldset>
      </form>
    </>
  ) : (
    <button type="button" onClick={changeAdding}>Add New Milestone</button>
  )
};

export default MilestoneForm;
