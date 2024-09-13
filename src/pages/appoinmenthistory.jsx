import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import '../styles/appoinmenthistory.css';
import image from '../assets/appoinment.jpg';

export default function HistoryAppointment() {
  const [appointments, setAppointments] = useState([]);
  const patientId = localStorage.getItem('patient_id'); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`https://localhost:7132/api/Appointment/patient/${patientId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [patientId]);

  
  const formatTime = (timeString) => {
    
    const [hours, minutes, seconds] = timeString.split(':');
    
    // Create a new date with the time components
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
    
    // Convert to Sri Lankan time by adding the offset (5 hours and 30 minutes)
    const sriLankanOffset = 5.5 * 60 * 60 * 1000; // offset in milliseconds
    const localTime = new Date(date.getTime() + sriLankanOffset);
    
    // Format the time to 'hh:mm AM/PM'
    return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="history-appointment">
      <Navbar />
      <div className="appointment-container1">
        <div className="image-container">
          <img src={image} alt="Appointment History" />
        </div>
        <h1 className="history-title">Your Appointment History</h1>

        <table className="appointment-table">
          <thead>
            <tr>
              <th>Appointment Date</th>
              <th>Full Name</th>
              <th>Time</th>
              <th>Seat Number</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.appointment_id}>
                  <td>{new Date(appointment.mad_appoinment_date).toLocaleDateString()}</td>
                  <td>{appointment.mad_full_name}</td>
                  <td>{appointment.mad_timeslot}</td>
                  <td>{appointment.mad_seat_no}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-appointments">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
