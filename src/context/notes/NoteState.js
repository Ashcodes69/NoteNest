import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  //get all notes
  const getNotes = async () => {
    const responce = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmNWU1NTg5NjFhOTQ5YmRlNjYyODExIn0sImlhdCI6MTc0NDE2ODI4MH0.kmsITSBGX5Q58lshz2utEtVs1M3UO_oNO0tMhtAZC3g",
      },
    });
    const json = await responce.json()
    console.log(json)
    setNotes(json)
  };
  // add a note
  const addNotes = async (title, description, tag) => {
    const responce = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmNWU1NTg5NjFhOTQ5YmRlNjYyODExIn0sImlhdCI6MTc0NDE2ODI4MH0.kmsITSBGX5Q58lshz2utEtVs1M3UO_oNO0tMhtAZC3g",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await responce.json()
    setNotes(notes.concat(json))
  };

  // delete a note
  const deleteNote = async(id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);

    const responce = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmNWU1NTg5NjFhOTQ5YmRlNjYyODExIn0sImlhdCI6MTc0NDE2ODI4MH0.kmsITSBGX5Q58lshz2utEtVs1M3UO_oNO0tMhtAZC3g",
      },
    });
    const json = await responce.json()
    console.log(json)
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    const responce = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmNWU1NTg5NjFhOTQ5YmRlNjYyODExIn0sImlhdCI6MTc0NDE2ODI4MH0.kmsITSBGX5Q58lshz2utEtVs1M3UO_oNO0tMhtAZC3g",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await responce.json()
    setNotes(json)

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <noteContext.Provider value={{ notes, addNotes, deleteNote, editNote ,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
