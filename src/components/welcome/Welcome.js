import React from "react";
import Initial from "./images/initial.jpg";
import Planner from "./images/planner.jpg";
import Notes from "./images/notes.jpg";
import Milestones from "./images/milestones.jpg";
import { Slide, Slider, Caption } from "react-materialize";
import MilestoneCard from "../milestone/MilestoneCard";

const Welcome = props => {
  return (
    <>
      <Slider
        fullscreen={false}
        options={{
          duration: 500,
          height: 400,
          indicators: true,
          interval: 6000
        }}
      >
        <Slide image={<img alt="" src={Initial} />}>
          <Caption placement="center">
            <h3>Reach2Teach</h3>
            <h5 className="light grey-text text-lighten-5">
              A teaching assistant with little ones in mind
            </h5>
          </Caption>
        </Slide>
        <Slide image={<img alt="" src={Planner} />}>
          <Caption placement="left">
            <h3>Structured Lesson Planning</h3>
            <h5 className="light grey-text text-lighten-3">
              A digital lesson planner that's easy to use and keeps track for
              you
            </h5>
          </Caption>
        </Slide>
        <Slide image={<img alt="" src={Notes} />}>
          <Caption placement="right">
            <h3 className="grey-text text-darken-5">
              Notes for the Little Things
            </h3>
            <h5 className="light grey-text text-darken-5">
              Make notes to help your planning or to send parents progress
              updates
            </h5>
          </Caption>
        </Slide>
        <Slide image={<img alt="" src={Milestones} />}>
          <Caption placement="left">
            <h3 className="grey-text text-darken-2">Watch your child grow</h3>
            <h5 className="light grey-text text-darken-4">
              Celebrate the victorys and look back with a dated list of
              achievements
            </h5>
          </Caption>
        </Slide>
      </Slider>
      <div className="center section">
        <a
          className="waves-effect waves-light btn teal lighten-2"
          onClick={() => {
            props.history.push("/login");
          }}
        >
          <i className="material-icons left">fingerprint</i>Login
        </a>
     
        <a
          className="waves-effect waves-light btn teal lighten-2"
          onClick={() => {
            props.history.push("/register");
          }}
        >
          <i className="material-icons left">person</i>Register
        </a>
      </div>
    </>
  );
};

export default Welcome;
