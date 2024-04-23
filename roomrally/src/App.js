import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import RoomList from "./pages/roomList";
import Booking from "./pages/booking";
import Waitlist from "./pages/waitlist";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/waitlist" element={<Waitlist />} />
      </Routes>
    </Router>
  );
};

export default App;
