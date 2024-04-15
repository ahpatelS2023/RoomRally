import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import RoomList from "./pages/roomList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rooms" element={<RoomList />} />
      </Routes>
    </Router>
  );
};

export default App;
