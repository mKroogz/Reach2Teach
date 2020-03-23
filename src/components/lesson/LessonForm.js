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

  const formatDate = (value) => {
    const dateArray = value.split("-");
    const temp = dateArray[0];
    dateArray[0] = dateArray[1];
    dateArray[1] = dateArray[2];
    dateArray[2] = temp;
    return `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`;
  };

  const handleFieldChange = evt => {
    const stateToChange = { ...lessonPlan };
    stateToChange[evt.target.id] = evt.target.value;
    setLessonPlan(stateToChange);
  };

  const handleDateChange = evt => {
    const stateToChange = { ...lessonPlan };
    stateToChange[evt.target.id] = formatDate(evt.target.value);
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
        <div className="Back">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => props.history.push("/notes")}
            >
              Go Back
            </button>
          </div>
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
            <input type="date" onChange={handleDateChange} id="date" />
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
