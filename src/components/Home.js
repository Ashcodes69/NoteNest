import React from "react";
import Notes from "./Notes";
import AddNotes from "./AddNotes";


function Home(props) {
const{showAlert}=props
  return (
    <div>
      <AddNotes/>
      <Notes showAlert={showAlert}></Notes>
    </div>
  );
}

export default Home;
