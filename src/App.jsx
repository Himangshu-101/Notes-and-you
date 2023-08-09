import {
  BrowserRouter,
  // RouterProvider,
  Route,
  Routes,
} from "react-router-dom"; 
// import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Singup";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route exact path = "/" element = { <Home />}/>
              <Route exact path = "/about" element = { <About />}/>
              <Route exact path = "/login" element = { <Login />}/>
              <Route exact path = "/signup" element = { <Signup />}/>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
