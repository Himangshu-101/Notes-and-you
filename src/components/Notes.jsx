import { useContext, useRef, useEffect, useState } from "react"
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {

    const [ note, setNote ] = useState({Etitle: "", Edescription: "", Etag: "general"});
    const context = useContext(NoteContext);
    const { notes, addNote, getNotes } = context;

    useEffect(() => {
        getNotes();
    }, []);

    const ref = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({Etitle: currentNote.title, Edescription: currentNote.description, Etag: currentNote.tag});
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.Etitle, note.Edescription, note.Etag);
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }


    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="form-group my-2">
                                    <label htmlFor="title">Title</label>
                                    <input type="title" className="form-control my-1" id="Etitle" name="Etitle" value={note.Etitle} onChange={onChange} />
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control my-1" id="Edescription" name="Edescription" value={note.Edescription} onChange={onChange} />
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" className="form-control my-1" id="Etag" name="Etag" value={note.Etag} onChange={onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3 justify-content-md-center">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} key={note._id} />
                })}
            </div>
        </>
    )
}

export default Notes