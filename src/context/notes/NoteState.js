import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmNWU1NTg5NjFhOTQ5YmRlNjYyODExIn0sImlhdCI6MTc0NDE2ODI4MH0.kmsITSBGX5Q58lshz2utEtVs1M3UO_oNO0tMhtAZC3g",
      },
    });
    const json = await response.json();
    setNotes(json); // Make sure this is an array
  };

  // Add a note
  const addNotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmNWU1NTg5NjFhOTQ5YmRlNjYyODExIn0sImlhdCI6MTc0NDE2ODI4MH0.kmsITSBGX5Q58lshz2utEtVs1M3UO_oNO0tMhtAZC3g",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json)); // Append the new note
  };

  // Delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmNWU1NTg5NjFhOTQ5YmRlNjYyODExIn0sImlhdCI6MTc0NDE2ODI4MH0.kmsITSBGX5Q58lshz2utEtVs1M3UO_oNO0tMhtAZC3g",
      },
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdmNWU1NTg5NjFhOTQ5YmRlNjYyODExIn0sImlhdCI6MTc0NDE2ODI4MH0.kmsITSBGX5Q58lshz2utEtVs1M3UO_oNO0tMhtAZC3g",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Update local state manually
    const updatedNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        addNotes,
        deleteNote,
        editNote,
        getNotes,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
