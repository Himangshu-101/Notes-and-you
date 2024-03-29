import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://notes-and-you.vercel.app";

  // Get all notes from fetch
  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      }
    });

    const json = await response.json();
    // console.log(json);
    setNotes(json);

  }

  const NotesI = []
  const [notes, setNotes] = useState(NotesI);


  // Add Notes from fetch
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });


    // Logic to add notes in client
    // console.log("Added a new note");
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      },
    });
    const json = response.json();
    // console.log(json);

    // console.log("Deleting node with id : " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  const updateNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    // const json = response.json();

    // Logic to edit in client 
    // This is done because we can't directly change the state here in React
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      // console.log(newNotes);
      setNotes(newNotes);
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
