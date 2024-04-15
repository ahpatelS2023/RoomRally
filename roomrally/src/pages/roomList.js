import React from "react";
import "./roomList.css";
import roomImage1 from "../images/room-1.png";
import roomImage2 from "../images/room-2.png";
import logo from "../images/mascot.png";
import bot from "../images/bot.png";
import Footer from "../components/footer";

const RoomList = () => {
  // Assuming room data could be fetched from an API and stored in state
  const rooms = [
    { name: "Room 224", capacity: 4, image: roomImage1 },
    { name: "Conference Room", capacity: 10, image: roomImage2 },
    // Add more rooms as necessary
  ];

  const waitlist = {
    roomName: "Room 224",
    position: 3,
  };

  const [isChatbotOpen, setChatbotOpen] = React.useState(false);

  const handleChatbotOpen = () => {
    // Open chatbot logic
    setChatbotOpen(true);
  };

  return (
    <div>
      <div className="room-list-container">
        <div class="header">
          <img src={logo} alt="RoomRally Logo" className="room-list-logo" />
          <h1>RoomRally</h1>
        </div>
        {rooms.map((room, index) => (
          <div key={index} className="room-card">
            <img src={room.image} alt={room.name} className="room-image" />
            <h2>{room.name}</h2>
            <p>Capacity: {room.capacity}</p>
            <button className="book-now-button">Book Now</button>
          </div>
        ))}
        <div className="waitlist-section">
          <h2>Waitlist Management</h2>
          <br></br>
          <div className="waitlist-card">
            <h3>{waitlist.roomName}</h3>
            <p>Your Position: {waitlist.position}</p>
            <button className="join-waitlist-button">Join Waitlist</button>
          </div>
        </div>
        <img
          src={bot}
          alt="chatbot"
          className="chatbot-button"
          onClick={handleChatbotOpen}
        />
      </div>
      <Footer />
    </div>
  );
};

export default RoomList;
