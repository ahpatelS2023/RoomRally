import Footer from "../components/footer";
import Chatbot from "../components/chatbot";
import { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./booking.css";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  const timeSlots = ["09:00AM", "10:00AM", "01:00PM", "02:00PM"];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleStudentChange = (student) => {
    setSelectedStudent(student);
  };

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/rooms");
  };

  const disablePastDates = ({ date, view }) => {
    // Disable dates before today
    if (view === "month") {
      return date <= new Date();
    }
  };

  const handleBooking = () => {
    console.log(
      "Booking for:",
      selectedDate,
      selectedTimeSlot,
      selectedStudent
    );
  };

  return (
    <div>
      <div className="booking-container">
        <div className="header">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="back-icon"
            onClick={handleBack}
          />
          <h1> Booking</h1>
        </div>
        <Calendar
          className="react-calendar"
          value={selectedDate}
          onChange={handleDateChange}
          tileDisabled={disablePastDates}
        />
        <h3>Available Time Slots</h3>
        <div className="time-slot-container">
          {timeSlots.map((timeSlot) => (
            <button
              key={timeSlot}
              className="time-slot-button"
              onClick={() => handleTimeSlotChange(timeSlot)}
              disabled={selectedTimeSlot === timeSlot}
            >
              {timeSlot}
            </button>
          ))}
        </div>
        <h3>Select Students</h3>
        <div className="student-selection">
          <label>
            <input
              type="checkbox"
              className="student-checkbox"
              checked={selectedStudent === "Jane Doe"}
              onChange={() => handleStudentChange("Jane Doe")}
            />
            <span className="student-name">Eion Tyacke</span>{" "}
          </label>
        </div>
        <div className="student-selection">
          <label>
            <input
              type="checkbox"
              className="student-checkbox"
              checked={selectedStudent === "Jane Doe"}
              onChange={() => handleStudentChange("Jane Doe")}
            />
            <span className="student-name">Ami Patel</span>{" "}
          </label>
        </div>
        <div className="student-selection">
          <label>
            <input
              type="checkbox"
              className="student-checkbox"
              checked={selectedStudent === "Jane Doe"}
              onChange={() => handleStudentChange("Jane Doe")}
            />
            <span className="student-name">Tong Hu</span>{" "}
          </label>
        </div>
        <div className="student-selection">
          <label>
            <input
              type="checkbox"
              className="student-checkbox"
              checked={selectedStudent === "Jane Doe"}
              onChange={() => handleStudentChange("Jane Doe")}
            />
            <span className="student-name">Brian Hernandez</span>{" "}
          </label>
        </div>
        <button className="book-button" onClick={handleBooking}>
          Book Now
        </button>
      </div>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Booking;
