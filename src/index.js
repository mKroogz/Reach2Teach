import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import Reach2Teach from "./components/Reach2Teach"

ReactDOM.render(
    <Router>
        <Reach2Teach/>
    </Router>,
    document.getElementById("root")
);