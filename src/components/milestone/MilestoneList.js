import React, { useState, useEffect } from "react";
import MilestoneCard from "./MilestoneCard";
import MilestoneManageCard from "./MilestoneManageCard";
import MilestoneForm from "./MilestoneForm";
import MilestoneManager from "../../modules/MilestoneManager";
import moment from "moment";

const MilestoneList = props => {
  const student = Number(sessionStorage.getItem("current"));
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
      <div className="conatainerCards">
        {completed.map(milestone => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            toggleCompleteMilestone={toggleCompleteMilestone}
            {...props}
          />
        ))}
        {notCompleted.map(milestone => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            toggleCompleteMilestone={toggleCompleteMilestone}
            {...props}
          />
        ))}
      </div>
      <section className="manageViewToggle">
        <button type="button" className="btn" onClick={toggleManageView}>
          Manage Milestones
        </button>
      </section>
    </>
  ) : (
    <>
      <h2>Manage Milestones</h2>
      <div>
        <MilestoneForm key={1} getMilestones={getMilestones} {...props} />
      </div>
      <div className="conatainerCards">
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
        <button type="button" className="btn" onClick={toggleManageView}>
          Save Changes
        </button>
      </section>
    </>
  );
};

export default MilestoneList;
