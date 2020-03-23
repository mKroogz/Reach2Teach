import React, { useState, useEffect } from "react";
import MilestoneEditForm from "./MilestoneEditForm";

const MilestoneManageCard = props => {
  const [isEdit, setIsEdit] = useState(true);

  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    changeEdit();
  }, []);

  return isEdit ? (
    <MilestoneEditForm
      key={props.milestone.id}
      milestone={props.milestone}
      getMilestones={props.getMilestones}
      changeEdit={changeEdit}
      {...props}
    />
  ) : (
    <div className="card">
      <div className="card-content">
          <span className="card-name">
            {props.milestone.milestone}
          </span>
        <button type="button" onClick={changeEdit}>Edit</button>
        <button
          type="button"
          onClick={() => {
            props.deleteMilestone(props.milestone.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MilestoneManageCard;
