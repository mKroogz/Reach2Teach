import React, { useState } from "react";
import LessonManager from "../../modules/LessonManager";
import { Row, Textarea, DatePicker } from "react-materialize";
import moment from "moment";

const LessonForm = props => {
  const [lessonPlan, setLessonPlan] = useState({
    title: "",
    plan: "",
    studentId: Number(sessionStorage.getItem("current"))
  });
  const [lessonDate, setLessonDate] = useState({
    date: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...lessonPlan };
    stateToChange[evt.target.id] = evt.target.value;
    setLessonPlan(stateToChange);
  };

  const handleDateChange = evt => {
    const stateToChange = { ...lessonDate };
    stateToChange["date"] = moment(evt).format("L");
    setLessonDate(stateToChange);
  };

  const constructNewLessonPlan = evt => {
    evt.preventDefault();
    if (
      lessonPlan.title === "" ||
      lessonDate.date === "" ||
      lessonPlan.plan === ""
    ) {
      window.alert("Please fill all fields");
    } else {
      setIsLoading(true);
      const lessonObj = {
        title: lessonPlan.title,
        plan: lessonPlan.plan,
        date: lessonDate.date,
        studentId: Number(sessionStorage.getItem("current"))
      };
      LessonManager.post(lessonObj).then(() => props.history.push("/lessons"));
    }
  };

  return (
    <>
      <form className="row">
        <fieldset className="col s8">
          <div>
            <a
              className="waves-effect waves-light btn"
              onClick={() => props.history.push("/lessons")}
            >
              <i className="material-icons left">fast_rewind</i>Back
            </a>
          </div>
          <div className="formgrid">
            <div className="input-field">
              <input
                onChange={handleFieldChange}
                id="title"
                type="text"
                className="validate"
              />
              <label for="title">Title</label>
            </div>
            <Row>
              <Textarea
                onChange={handleFieldChange}
                id="plan"
                label="Write Lesson Plan here..."
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
              className="btn waves-effect waves-light teal lighten-2"
              type="button"
              disabled={isLoading}
              onClick={constructNewLessonPlan}
            >
              Submit
              <i class="material-icons right">send</i>
            </a>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default LessonForm;
