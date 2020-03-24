import React, {useEffect} from "react";

const CatchParent = () => {
    const parentAlert = () =>  {
        window.alert("This Area is for Teachers Only")
    }
    
    useEffect(() => {
        parentAlert();
      }, []);

  return (
    <>
    <h1 onClick={parentAlert}>Teacher's Lounge</h1>
    <img
        src="https://tamaractalk.com/wp-content/uploads/2019/08/after-lounge-480x270.jpg"
        alt="Teach Lounge"
        onClick={parentAlert}
      ></img>
      </>
  );
};

export default CatchParent;
