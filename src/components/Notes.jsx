import { useContext, useRef, useEffect, useState } from "react"
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {

    const [note, setNote] = useState({ Etitle: "", Edescription: "", Etag: "" });
    const context = useContext(NoteContext);
    const { notes, updateNote, getNotes } = context;

    useEffect(() => {
        getNotes();
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const editNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, Etitle: currentNote.title, Edescription: currentNote.description, Etag: currentNote.tag });
    }

    const handleClick = (e) => {
        updateNote(note.id, note.Etitle, note.Edescription, note.Etag);
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.Etitle.length < 5 || note.Edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3 justify-content-md-center">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 &&
                        <p className="text-center">You currently don't have any notes in the directory</p>
                    }
                </div>
                {notes.map((note) => {
                    return <NoteItem note={note} editNote={editNote} key={note._id} />
                })}
            </div>
        </>
    )
}

export default Notes