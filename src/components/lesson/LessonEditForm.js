import React, { useState, useEffect } from "react";
import LessonManager from "../../modules/LessonManager";
import { Row, Textarea, DatePicker } from "react-materialize";
import moment from 'moment'

const LessonEditForm = props => {
  const [lesson, setLesson] = useState({
    title: "",
    studentId: "",
    plan: "",
  });
  const [lessonDate, setLessonDate] = useState({
    date: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleFieldChange = evt => {
    const stateToChange = { ...lesson };
    stateToChange[evt.target.id] = evt.target.value;
    setLesson(stateToChange);
  };

  const handleDateChange = (evt) => {
    const stateToChange = { ...lessonDate };
    stateToChange["date"] = moment(evt).format('L');
    setLessonDate(stateToChange)
  };


  const updateExistingLesson = evt => {
    evt.preventDefault();
    setIsLoading(true);

    const editedLesson = {
      id: props.match.params.lessonId,
      title: lesson.title,
      studentId: lesson.studentId,
      plan: lesson.plan,
      date: lessonDate.date
    };

    LessonManager.update(editedLesson).then(() =>
      props.history.push("/lessons")
    );
  };

  useEffect(() => {
    LessonManager.get(props.match.params.lessonId).then(lesson => {
      setLesson(lesson);
      const dateObj = {
        date: lesson.date
      }
      setLessonDate(dateObj)
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <form className="row">
        <fieldset className="col s8">
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
            <Row>
              <Textarea
                onChange={handleFieldChange}
                id="plan"
                value={lesson.plan}
                l={12}
                m={12}
                s={12}
                xl={12}
              />
            </Row>
            <label htmlFor="date">Date</label>
            <Row>
              <DatePicker
                onChange={handleDateChange}
                id="date"
                options={{
                  autoClose: false,
                  container: null,
                  defaultDate: null,
                  disableDayFn: null,
                  disableWeekends: false,
                  events: [],
                  firstDay: 0,
                  format: "mm/dd/yyyy",
                  i18n: {
                    cancel: "Cancel",
                    clear: "Clear",
                    done: "Ok",
                    months: [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ],
                    monthsShort: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec"
                    ],
                    nextMonth: "›",
                    previousMonth: "‹",
                    weekdays: [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ],
                    weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"],
                    weekdaysShort: [
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat"
                    ]
                  },
                  isRTL: false,
                  maxDate: null,
                  minDate: null,
                  onClose: null,
                  onDraw: null,
                  onOpen: null,
                  onSelect: null,
                  parse: null,
                  setDefaultDate: false,
                  showClearBtn: false,
                  showDaysInNextAndPreviousMonths: false,
                  showMonthAfterYear: false,
                  yearRange: 10
                }}
              />
            </Row>
          </div>

          <div className="alignRight">
            <a
            className = "btn waves-effect waves-light teal lighten-2"
              type="button"
              disabled={isLoading}
              onClick={updateExistingLesson}
            >
              Save
            </a>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default LessonEditForm;
