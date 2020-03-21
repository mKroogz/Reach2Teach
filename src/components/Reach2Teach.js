import React, {useState} from "react"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"

const Reach2Teach = () => {
    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

    const [hasUser, setHasUser] = useState(isAuthenticated());

    const setUser = (user, id, userType) => {
        sessionStorage.setItem("credentials", JSON.stringify(user));
        sessionStorage.setItem("type", userType)
        sessionStorage.setItem("id", id)
        sessionStorage.setItem("current", 0)
        setHasUser(isAuthenticated());
    }

    const clearUser = () => {
        sessionStorage.clear();
        setHasUser(isAuthenticated());
    }

    return (
    <>
        <NavBar hasUser={hasUser} clearUser={clearUser} />
        <ApplicationViews hasUser={hasUser} setUser={setUser} />
    </>
    )
}

export default Reach2Teach