import React, { useState, useEffect } from "react"
import LessonManager from "../../modules/LessonManager"

const LessonEditForm = props => {
  const [lesson, setLesson] = useState({ title: "", studentId: "", plan: "", date: "" });
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (value) => {
    const dateArray = value.split("-");
    const temp = dateArray[0];
    dateArray[0] = dateArray[1];
    dateArray[1] = dateArray[2];
    dateArray[2] = temp;
    return `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`;
  };

  const handleFieldChange = evt => {
    const stateToChange = { ...lesson };
    stateToChange[evt.target.id] = evt.target.value;
    setLesson(stateToChange);
  };

  const handleDateChange = evt => {
    const stateToChange = { ...lesson };
    stateToChange[evt.target.id] = formatDate(evt.target.value);
    setLesson(stateToChange);
  };

  const updateExistingLesson = evt => {
    evt.preventDefault()
    setIsLoading(true);

    const editedLesson = {
      id: props.match.params.lessonId,
      title: lesson.title,
      studentId: lesson.studentId,
      plan: lesson.plan,
      date: lesson.date
    };

    LessonManager.update(editedLesson)
      .then(() => props.history.push("/lessons"))
  }

  useEffect(() => {
    LessonManager.get(props.match.params.lessonId)
      .then(lesson => {
        setLesson(lesson);
        setIsLoading(false);
      });
  }, []);

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
              value={lesson.title}
            />
            </div>
            <div className="newPlan">
            <label htmlFor="plan">Plan:</label>
            <textarea
              rows="10"
              cols="75"
              onChange={handleFieldChange}
              id="plan"
              value={lesson.plan}
            />
            </div>
            <div className="newDate">
            <label htmlFor="date">Date:</label>
            <input type="date" onChange={handleDateChange} id="date"/>
            </div>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingLesson}
            >
              Save Changes
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default LessonEditForm