import React from "react";
import { Checkbox } from "react-materialize";

const MilestoneCard = props => {
  if (props.milestone.completeDate === "") {
    return (
      <div className="section">
      <div className="row">
        <div className="col s7 push-s4">
          {props.isTeacher ? (
            <Checkbox
              id={props.milestone.milestone}
              label=""
              value=""
              onChange={() =>
                props.toggleCompleteMilestone(props.milestone.id, false)
              }
            />
          ) : null}
          <span className="milestoneCardTitle">
            {props.milestone.milestone}
          </span>
        </div>
      </div>
      </div>
    );
  } else {
    return (
      <div className="section">
      <div className="row">
        <div className="col s7 push-s4">
          {props.isTeacher ? (
            <Checkbox
              checked
              id={props.milestone.milestone}
              label=""
              value=""
              onChange={() =>
                props.toggleCompleteMilestone(props.milestone.id, true)
              }
            />
          ) : null}
          <strong>
            <span className="milestoneCardTitle">
              {props.milestone.milestone} Completed:{" "}
              {props.milestone.completeDate}
            </span>
          </strong>
        </div>
      </div>
      </div>
    );
  }
};

export default MilestoneCard;
