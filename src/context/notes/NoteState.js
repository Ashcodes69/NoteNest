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
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json); // Make sure this is an array
    props.showAlert("Featched all notes successfully","success")
  };

  // Add a note
  const addNotes = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json)); // Append the new note
    props.showAlert("Note added successfully","success")
  };

  // Delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    props.showAlert("Note deleted successfully","danger")
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Update local state manually
    const updatedNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(updatedNotes);
    props.showAlert("Note updated successfully","success")
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
