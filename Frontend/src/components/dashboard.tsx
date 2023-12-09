import React from 'react';

function UserDashboard() {
  // Example user data (you should fetch this from your backend or state management)
  const user = {
    name: 'John Doe',
    studySessions: [
      {
        id: 1,
        subject: 'Math',
        date: '2023-10-25',
        time: '15:00',
        location: 'Library',
      },
      // Add more study session entries
    ],
    recommendations: [
      {
        id: 1,
        subject: 'Physics',
        date: '2023-10-26',
        time: '14:00',
        location: 'Online',
      },
      // Add more recommendation entries
    ],
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <h3>Welcome, {user.name}!</h3>
      <section>
        <h4>Profile</h4>
        <img src={user.profilePic} alt={`${user.name}'s profile`} />
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
      </section>

      <section>
        <h4>Performance Metrics</h4>
        <p><strong>Total Study Sessions:</strong> {user.totalSessions}</p>
        <p><strong>Total Study Hours:</strong> {user.totalHours}</p>
        <p><strong>Progress in Math:</strong> {user.progress.Math}%</p>
        {/* Repeat for other subjects */}
      </section>

      <section>
        <h4>Notifications</h4>
        {user.notifications.map((notification, index) => (
          <p key={index}>{notification.message}</p>
        ))}
      </section>



      {/* Display upcoming study sessions */}
      <section>
        <h4>Upcoming Study Sessions</h4>
        <ul>
          {user.studySessions.map((session) => (
            <li key={session.id}>
              <strong>Subject:</strong> {session.subject}<br />
              <strong>Date:</strong> {session.date}<br />
              <strong>Time:</strong> {session.time}<br />
              <strong>Location:</strong> {session.location}<br />
            </li>
          ))}
        </ul>
      </section>

      {/* Display recommended study sessions */}
      <section>
        <h4>Recommended Study Sessions</h4>
        <ul>
          {user.recommendations.map((recommendation) => (
            <li key={recommendation.id}>
              <strong>Subject:</strong> {recommendation.subject}<br />
              <strong>Date:</strong> {recommendation.date}<br />
              <strong>Time:</strong> {recommendation.time}<br />
              <strong>Location:</strong> {recommendation.location}<br />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default UserDashboard;
