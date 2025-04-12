import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="delete it"/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/logIn" element={<Login />}></Route>
            <Route exact path="/signUp" element={<Signup/>}></Route>
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
