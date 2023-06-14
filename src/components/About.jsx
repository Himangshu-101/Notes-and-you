import { useContext } from "react"
import NoteContext from "../context/notes/NoteContext"
import { useEffect } from "react"

const About = () => {

    const amd = useContext(NoteContext)
    const handleOnClick = () =>{
        amd.update();
    }

    return (
        <div>
            <h1>My name is {amd.state.name} and my branch is {amd.state.branch}.</h1>
            <button onClick={handleOnClick}>CLICK HERE</button>
        </div>
    )
}

export default About