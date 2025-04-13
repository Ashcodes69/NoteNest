import React,{useContext} from "react";
import NoteContext from "../context/notes/NoteContext";

function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {note.tag}
          </h6>
          <p className="card-text">{note.description}.</p>
          <i
            className="fa-solid fa-trash-can mx-3"
            onClick={() => {
              deleteNote(note._id);         
            }}
          ></i>
          <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>(updateNote(note))}></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
