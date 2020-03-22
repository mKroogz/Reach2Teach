import React, { useState } from "react";
import LessonManager from "../../modules/LessonManager";

const LessonForm = props => {
  const [lessonPlan, setLessonPlan] = useState({
    title: "",
    plan: "",
    date: "",
    studentId: Number(sessionStorage.getItem("current"))
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...lessonPlan };
    stateToChange[evt.target.id] = evt.target.value;
    setLessonPlan(stateToChange);
  };

  const constructNewLessonPlan = evt => {
    evt.preventDefault();
    if (
      lessonPlan.title === "" ||
      lessonPlan.date === "" ||
      lessonPlan.plan === ""
    ) {
      window.alert("Please fill all fields");
    } else {
      setIsLoading(true);
      LessonManager.post(lessonPlan).then(() => props.history.push("/lessons"));
    }
  };

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <div className="newTitle">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="title"
              placeholder="Lesson Title"
            />
            </div>
            <div className="newPlan">
            <label htmlFor="plan">Plan:</label>
            <textarea
              rows="10"
              cols="75"
              onChange={handleFieldChange}
              id="plan"
              placeholder="Type out lesson plan here"
            />
            </div>
            <div className="newDate">
            <label htmlFor="date">Date:</label>
            <input type="date" onChange={handleFieldChange} id="date" />
            </div>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewLessonPlan}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default LessonForm;
