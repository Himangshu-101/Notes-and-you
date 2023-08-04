import { useContext } from "react"
import NoteContext from "../context/notes/NoteContext";
import { useState } from "react";

const AddNote = () => {

    const context = useContext(NoteContext);
    const {addNote} = context;

    const [ note, setNote ] = useState({title: "", description: "", tag: "general"});
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (    
        <div className="container">
            <h2>Add your notes !</h2>
            <form className="my-3">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="title" className="form-control" id="title" name="title" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote