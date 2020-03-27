import React, { useState } from "react";
import MilestoneEditForm from "./MilestoneEditForm";

const MilestoneManageCard = props => {
  const [isEdit, setIsEdit] = useState(false);

  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  return isEdit ? (
    <MilestoneEditForm
      key={props.milestone.id}
      milestone={props.milestone}
      getMilestones={props.getMilestones}
      changeEdit={changeEdit}
      {...props}
    />
  ) : (
    <div className="card hoverable grey lighten-4">
      <div className="card-content">
          <span className="card-title">
            {props.milestone.milestone}
          </span>
          <i
          onClick={changeEdit}
          className="waves-effect col material-icons left"
        >
          edit
        </i> 
        <i
          onClick={() => {
            props.deleteMilestone(props.milestone.id);
          }}
          className="col material-icons left"
        >
          delete
        </i>      
         
      </div>
    </div>
  );
};

export default MilestoneManageCard;
