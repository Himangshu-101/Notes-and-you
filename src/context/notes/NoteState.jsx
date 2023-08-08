import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://127.0.0.1:5000";

  // Get all notes from fetch
  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjYmY3ZjgxMWNkZGYzNmVlNDViYjU1In0sImlhdCI6MTY5MTA5MDkwOX0.ahh_k54tbR2aawPh-6R5v_MeZLfiI5Vv_tpWc-wAKog"
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
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjYmY3ZjgxMWNkZGYzNmVlNDViYjU1In0sImlhdCI6MTY5MTA5MDkwOX0.ahh_k54tbR2aawPh-6R5v_MeZLfiI5Vv_tpWc-wAKog"
      },
      body: JSON.stringify({title, description, tag}),
    });


    // Logic to add notes in client
    console.log("Added a new note");
    const note =
    {
      "_id": "64cd4ebf23cdb5e747ea8cef",
      "user": "64cbf7f811cddf36ee45bb55",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-08-04T19:17:19.372Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjYmY3ZjgxMWNkZGYzNmVlNDViYjU1In0sImlhdCI6MTY5MTA5MDkwOX0.ahh_k54tbR2aawPh-6R5v_MeZLfiI5Vv_tpWc-wAKog"
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting node with id : " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  const updateNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjYmY3ZjgxMWNkZGYzNmVlNDViYjU1In0sImlhdCI6MTY5MTA5MDkwOX0.ahh_k54tbR2aawPh-6R5v_MeZLfiI5Vv_tpWc-wAKog"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    // Logic to edit in client 
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;