import React, { useState, useEffect } from "react";
import MilestoneCard from "./MilestoneCard";
import MilestoneManageCard from "./MilestoneManageCard";
import MilestoneForm from "./MilestoneForm";
import MilestoneManager from "../../modules/MilestoneManager";
import moment from "moment";

const MilestoneList = props => {
  const student = Number(sessionStorage.getItem("current"));
  const isTeacher = Number(sessionStorage.getItem("type"));

  const [milestones, setMilestones] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [notCompleted, setNotCompleted] = useState([]);
  const [isManaging, setIsManaging] = useState(false);

  const pushToStudentCenter = () => {
    window.alert("Select a Student from the Student Center to begin planning");
    props.history.push("/students");
  };

  const getMilestones = () => {
    if (!student) {
      pushToStudentCenter();
    } else {
      return MilestoneManager.getAll().then(milestonesFromAPI => {
        const currentMilestones = milestonesFromAPI.filter(
          milestone => milestone.studentId === student
        );
        const completedMilestones = currentMilestones.filter(
          milestone => milestone.completeDate !== ""
        );
        const unCompletedMilestones = currentMilestones.filter(
          milestone => milestone.completeDate === ""
        );
        setMilestones(currentMilestones);
        setCompleted(completedMilestones);
        setNotCompleted(unCompletedMilestones);
      });
    }
  };

  const deleteMilestone = id => {
    MilestoneManager.delete(id).then(getMilestones);
  };

  const toggleManageView = () => {
    setIsManaging(!isManaging);
  };

  const toggleCompleteMilestone = (id, isComplete) => {
    let completeDate = "";
    if (isComplete) {
      completeDate = "";
    } else {
      completeDate = moment().format("MM/DD/YY");
    }
    MilestoneManager.changeComplete(id, completeDate).then(getMilestones);
  };

  useEffect(() => {
    getMilestones();
  }, []);

  return !isManaging ? (
    <>
      <div className="center section">
      {isTeacher ?<button type="button" className="btn blue-grey lighten-3 black-text" onClick={toggleManageView}>
          Manage Milestones
        </button> : null}
      </div>
      <div className= "row">
    <div className = "col s6 push-s2 card hoverable grey lighten-3">
      <div>
        {completed.map(milestone => (
          <MilestoneCard
            key={milestone.id}
            isTeacher={isTeacher}
            milestone={milestone}
            toggleCompleteMilestone={toggleCompleteMilestone}
            {...props}
          />
        ))}
        {notCompleted.map(milestone => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            isTeacher={isTeacher}
            toggleCompleteMilestone={toggleCompleteMilestone}
            {...props}
          />
        ))}
      </div>
      </div>
      </div>
    </>
  ) : (
    <>
      <h2>Manage Milestones</h2>
      <div>
        <MilestoneForm key={1} getMilestones={getMilestones} {...props} />
      </div>
      <div>
        {milestones.map(milestone => (
          <MilestoneManageCard
            key={milestone.id}
            milestone={milestone}
            getMilestones={getMilestones}
            deleteMilestone={deleteMilestone}
            {...props}
          />
        ))}
      </div>
      <section className="manageViewToggle">
        <button type="button" className="btn blue-grey lighten-3 black-text" onClick={toggleManageView}>
          Save
        </button>
      </section>
    </>
  );
};

export default MilestoneList;
