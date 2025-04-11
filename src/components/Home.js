import React from "react";
import Notes from "./Notes";
import AddNotes from "./AddNotes";


function Home() {
  return (
    <div>
      <AddNotes />
      <Notes></Notes>
    </div>
  );
}

export default Home;
