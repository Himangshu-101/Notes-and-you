import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const data = {
        "name": "Himangshu",
        "branch": "ECE"
    }

    const [state, setState] = useState(data);
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Sarma",
                "branch": "CSE"            
            })
        }, 1000);
    }

    return (
        <NoteContext.Provider value = {{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;