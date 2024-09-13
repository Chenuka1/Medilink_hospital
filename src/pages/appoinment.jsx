import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/availableTimeslots.css'; 

export default function Appointment() {
  const [showDialog, setShowDialog] = useState(false);
  const [timeslotData, setTimeslotData] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null); 
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedTimeslot(null);
  };

  const openDialog = (timeslot) => {
    setSelectedTimeslot(timeslot);
    setShowDialog(true);
  };

  const handleConfirm = async () => {
    if (!fullName || !contact) {
      setErrorMessage("Please enter both name and contact details.");
      return;
    }
    try {
      await submitAppointment();
      await handleUpdate();
      setShowDialog(false);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Failed to confirm appointment. Please try again.');
      }
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`https://localhost:7132/api/Timeslot/${selectedTimeslot.mt_slot_id}/incrementSeat`, {
        seat_number: selectedTimeslot.mt_seat_number + 1
      });
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Failed to update timeslot. Please try again.');
      }
      console.error(error);
    }
  };

  const submitAppointment = async () => {
    try {
      
      const appointmentData = {
        
        MAD_FULL_NAME: fullName,
        MAD_CONTACT: contact,
        MAD_SEAT_NO: selectedTimeslot.MT_SEAT_NUMBER + 1,
        MAD_APPOINMENT_DATE: selectedTimeslot.MT_SLOT_DATE,
      };
      await axios.post('https://localhost:7132/api/Appointment', appointmentData);
      alert('Appointment confirmed successfully!');
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setErrorMessage('Failed to confirm appointment. Please try again.');
    }
  };

  useEffect(() => {
    const fetchTimeslots = async () => {
      try {
        const response = await axios.get('https://localhost:7132/api/Timeslot');
        setTimeslotData(response.data);
      } catch (error) {
        console.error('Error fetching timeslots:', error);
        setErrorMessage('Failed to load timeslots. Please try again later.');
      }
    };
    fetchTimeslots();
  }, []);

  return (
    <div className="appointment-container">
      <div className="timeslot-container">
        {timeslotData.length > 0 ? (
          <div className="timeslot-grid">
            {timeslotData.map((timeslot) => (
              <div key={timeslot.mt_slot_id} className="timeslot-card">
                <div className="timeslot-time">
                  <h3>Appointment date {new Date(timeslot.MT_SLOT_DATE).toLocaleDateString()}</h3>
                  <p>
                    {new Date(`1970-01-01T${timeslot.MT_START_TIME}`).toLocaleTimeString('en-LK', { 
                      timeZone: 'Asia/Colombo', 
                      hour: 'numeric', 
                      minute: 'numeric', 
                      hour12: true 
                    })} 
                    - 
                    {new Date(`1970-01-01T${timeslot.MT_END_TIME}`).toLocaleTimeString('en-LK', { 
                      timeZone: 'Asia/Colombo', 
                      hour: 'numeric', 
                      minute: 'numeric', 
                      hour12: true 
                    })}
                  </p>
                </div>
                <div className="timeslot-body1">
                  <p><strong>Available Seats:</strong> {timeslot.MT_SEAT_NUMBER}</p>
                </div>
                <button
                  type="button"
                  className="timeslot-button"
                  onClick={() => openDialog(timeslot)} 
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-appointments">No available timeslots</p>
        )}

        {showDialog && selectedTimeslot && ( 
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h2>Confirm Your Appointment</h2>
              <div className="dialog-input-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="dialog-input-group">
                <label>Contact</label>
                <input
                  type="text"
                  placeholder="Enter your contact details"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="dialog-buttons">
                <button onClick={handleConfirm} className="btn-primary">
                  Confirm
                </button>
                <button onClick={closeDialog} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
