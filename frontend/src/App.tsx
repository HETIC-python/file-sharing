import { Route, Routes } from "react-router";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Fileupload from "./components/Fileupload";

function App() {
  return (
    <div className="grid gap-10">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fileupload" element={<Fileupload />} />
      </Routes>
    </div>
  );
}

export default App;
