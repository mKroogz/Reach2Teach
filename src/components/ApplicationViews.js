import { Route, Redirect } from "react-router-dom";
import React from "react";
import Home from "./home/Home";
import Welcome from "./welcome/Welcome";
import Login from "./auth/Login";
import Registration from "./registration/Registration";
import TeacherStudentCenter from "./student/TeacherStudentCenter";
import LessonList from "./lesson/LessonList";
import LessonForm from "./lesson/LessonForm";
import LessonDetail from "./lesson/LessonDetail"
import LessonEditForm from "./lesson/LessonEditForm"
import NoteList from "./note/NoteList"
import NoteForm from "./note/NoteForm"
import NoteEditForm from "./note/NoteEditForm"
import MilestoneList from "./milestone/MilestoneList"

const ApplicationViews = props => {
  const setUser = props.setUser;
  const hasUser = props.hasUser;
  return (
    <React.Fragment>
      <Route
        path="/login"
        render={props => {
          return <Login setUser={setUser} {...props} />;
        }}
      />
      <Route
        path="/register"
        render={props => {
          return <Registration setUser={setUser} {...props} />;
        }}
      />
      <Route
        exact
        path="/"
        render={props => {
          return hasUser ? <Home hasUser={hasUser} /> : <Welcome {...props} />;
        }}
      />
      <Route
        exact
        path="/students"
        render={props => {
          return hasUser ? (
            <TeacherStudentCenter {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      <Route
        exact
        path="/milestones"
        render={props => {
          return hasUser ? <MilestoneList {...props} /> : <Redirect to="/login" />;
        }}
      />
      <Route
        exact
        path="/notes"
        render={props => {
          return hasUser ? <NoteList {...props} /> : <Redirect to="/login" />;
        }}
      />
      <Route
        path="/notes/new"
        render={props => {
          return hasUser ? <NoteForm {...props} /> : <Redirect to="/login" />;
        }}
      />
      <Route
        path="/notes/:noteId(\d+)/edit"
        render={props => {
          return hasUser ? (
            <NoteEditForm noteId={parseInt(props.match.params.noteId)} {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      <Route
        exact
        path="/lessons"
        render={props => {
          return hasUser ? <LessonList {...props} /> : <Redirect to="/login" />;
        }}
      />
      <Route
        path="/lessons/new"
        render={props => {
          return hasUser ? <LessonForm {...props} /> : <Redirect to="/login" />;
        }}
      />
      <Route
        exact
        path="/lessons/:lessonId(\d+)"
        render={props => {
          return hasUser ? (
            <LessonDetail
              lessonId={parseInt(props.match.params.lessonId)}
              {...props}
            />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
      <Route
        path="/lessons/:lessonId(\d+)/edit"
        render={props => {
          return hasUser ? (
            <LessonEditForm {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
    </React.Fragment>
  );
};

export default ApplicationViews;
