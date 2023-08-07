import { useContext } from "react"
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useEffect } from "react";

const Notes = () => {

    const context = useContext(NoteContext);
    const {notes, getNotes} = context;

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            <AddNote />
            <div className="row my-3 justify-content-md-center">
                    <h2>Your Notes</h2>
                    {notes.map((note, key) => {
                        return <NoteItem note={note} key={key}/>
                    })}
            </div>
        </>
    )
}

export default Notes