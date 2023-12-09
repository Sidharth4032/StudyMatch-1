import React, { useState } from 'react';
import './main.css';

function AvailabilitySchedule() {
  // Example schedule data (you may fetch this from your backend)
  const [schedule, setSchedule] = useState([
    { id: 1, day: 'Monday', time: '10:00 - 12:00' },
    { id: 2, day: 'Wednesday', time: '14:00 - 16:00' },
    { id: 3, day: 'Friday', time: '09:00 - 11:00' },
    // Add more schedule entries as needed
  ]);

  // Function to handle the selection of a time slot
  const selectTimeSlot = (slotId) => {
    alert(`You selected time slot ID: ${slotId}`);
    // Here you might set the selected time slot in your state or perform other actions
  };

  return (
    <div>
      <h2>Available Time Slots</h2>
      <ul>
        {schedule.map((slot) => (
          <li key={slot.id} onClick={() => selectTimeSlot(slot.id)}>
            <strong>Day:</strong> {slot.day}<br />
            <strong>Time:</strong> {slot.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailabilitySchedule;
