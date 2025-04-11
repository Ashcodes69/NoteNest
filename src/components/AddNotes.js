import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNotes() {
  const context = useContext(NoteContext);
  const { addNotes } = context;

  const [note, setNote] = useState({ title: "", description: "", tag:"default" });
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleAddNote = (e) => {
    e.preventDefault()
    addNotes(note.title, note.description, note.tag)
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onchange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleAddNote}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNotes;
