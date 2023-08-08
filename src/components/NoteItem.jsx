import { useContext } from "react"
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {

    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const { note, editNote } = props;

    return (
        <div className="col-4 my-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title mb-3">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { editNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem