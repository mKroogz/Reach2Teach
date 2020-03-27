import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import Reach2Teach from "./components/Reach2Teach"
import "../node_modules/materialize-css/dist/css/materialize.css"

ReactDOM.render(
    <Router>
        <Reach2Teach/>
    </Router>,
    document.getElementById("root")
);