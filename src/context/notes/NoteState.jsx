import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const NotesI = [
        {
          "_id": "64cc060f375c05d7c395f191",
          "user": "64cbf7f811cddf36ee45bb55",
          "title": "my title",
          "description": "here is the description",
          "tag": "deArr",
          "date": "2023-08-03T19:54:55.849Z",
          "__v": 0
        },
        {
          "_id": "64cd4ebf23cdb5e747ea8cef",
          "user": "64cbf7f811cddf36ee45bb55",
          "title": "my title2",
          "description": "here is the description2",
          "tag": "deArr",
          "date": "2023-08-04T19:17:19.372Z",
          "__v": 0
        },
        {
            "_id": "64cd4ebf23cdb5e747ea8cef",
            "user": "64cbf7f811cddf36ee45bb55",
            "title": "my title2",
            "description": "here is the description2",
            "tag": "deArr",
            "date": "2023-08-04T19:17:19.372Z",
            "__v": 0
        }
    ]
    const [ notes, setNotes ] = useState(NotesI);

    const addNote = (title, description, tag) => {
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

    const deleteNote = () => {

    }

    const updateNote = () => {

    }

    return (
        <NoteContext.Provider value = {{notes, setNotes, addNote, deleteNote, updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;