import React from "react";

const MilestoneCard = props => {
  if (props.milestone.completeDate === "") {
    return (
      <div className="milestoneCard">
        <div className="milestoneCardContent">
          <input
            type="checkbox"
            id="completeDate"
            checked={false}
            onChange={() => props.toggleCompleteMilestone(props.milestone.id, false)}
          />
            <span className="milestoneCardTitle">{props.milestone.milestone}</span>
        </div>
      </div>
    );
  } else {
    return (
        <div className="milestoneCard">
        <div className="milestoneCardContent">
          <input
            type="checkbox"
            id="completeDate"
            checked={true}
            onChange={() => props.toggleCompleteMilestone(props.milestone.id, true)}
          />
            <strong><span className="milestoneCardTitle">{props.milestone.milestone} Completed: {props.milestone.completeDate}</span></strong>
        </div>
      </div>
    );
  }
};

export default MilestoneCard;
