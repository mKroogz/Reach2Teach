import React, { useState, useEffect } from "react";
import MilestoneManager from "../../modules/MilestoneManager";

const MilestoneEditForm = props => {
  const [existingMilestone, setExistingMilestone] = useState({
    milestone: "",
    completeDate: "",
    studentId: Number(sessionStorage.getItem("current"))
  });

  const handleFieldChange = evt => {
    const stateToChange = { ...existingMilestone };
    stateToChange[evt.target.id] = evt.target.value;
    setExistingMilestone(stateToChange);
  };

  const updateExistingMilestone = evt => {
    evt.preventDefault()

    const editedMilestone = {
      id: props.milestone.id,
      milestone: existingMilestone.milestone,
      completeDate: existingMilestone.completeDate,
      studentId: existingMilestone.studentId
    };

    MilestoneManager.update(editedMilestone).then(props.getMilestones).then(props.changeEdit)
  }

  useEffect(() => {
    MilestoneManager.get(props.milestone.id)
      .then(milestone => {
        setExistingMilestone(milestone);
      });
  }, []);

  return (
    <>
      <form onSubmit={updateExistingMilestone}>
        <fieldset>
          <div className="formgrid">
          <label htmlFor="milestone">Milestone</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="milestone"
              value={existingMilestone.milestone}
            />
          </div>
          <div className="alignRight">
            <button type="submit">
              Save Changes
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default MilestoneEditForm;
