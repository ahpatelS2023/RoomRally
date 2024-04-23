import React from "react";
import { useNavigate } from "react-router-dom";
import "./roomList.css";
import roomImage1 from "../images/room-1.png";
import roomImage2 from "../images/room-2.png";
import logo from "../images/mascot.png";
import Chatbot from "../components/chatbot";
import Footer from "../components/footer";

const RoomList = () => {
  const navigate = useNavigate();
  const rooms = [
    { name: "Room 224", capacity: 4, image: roomImage1 },
    { name: "Room 129A (Conference Room)", capacity: 8, image: roomImage2 },
    { name: "Room 129B (Conference Room)", capacity: 8, image: roomImage2 },
    { name: "Room 228", capacity: 6, image: roomImage1 },
    { name: "Room 230 (Conference Room)", capacity: 8, image: roomImage2 },
  ];

  const waitlists = [
    { roomName: "Room 224", position: 3 },
    { roomName: "Room 129A (Conference Room)", position: 1 },
    { roomName: "Room 129B (Conference Room)", position: 5 },
    { roomName: "Room 228", position: 2 },
    { roomName: "Room 230 (Conference Room)", position: 4 },
  ];

  const handleBookNow = (event) => {
    event.preventDefault();
    navigate("/booking");
  };

  const handleWaitlist = (event) => {
    event.preventDefault();
    navigate("/waitlist");
  };

  return (
    <div>
      <div className="room-list-container">
        <div className="header">
          <img src={logo} alt="RoomRally Logo" className="room-list-logo" />
          <h1>RoomRally</h1>
        </div>
        {rooms.map((room, index) => (
          <div key={index} className="room-card">
            <img src={room.image} alt={room.name} className="room-image" />
            <h2>{room.name}</h2>
            <p>Capacity: {room.capacity}</p>
            <button className="book-now-button" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        ))}
        <div className="waitlist-section">
          <h2>Waitlist Management</h2>
          <br></br>
          {waitlists.map((waitlist, index) => (
            <div className="waitlist-card">
              <h3>{waitlist.roomName}</h3>
              <p>Your Position: {waitlist.position}</p>
              <button className="join-waitlist-button" onClick={handleWaitlist}>
                Join Waitlist
              </button>
            </div>
          ))}
        </div>
      </div>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default RoomList;
