// import React from 'react';

import ContactPage from "../../components/contactPage/main";

// // SubjectBox component
// const SubjectBox = ({ subjectName, icon }) => (
//   <div className="subject-box">
//     <img src={icon} alt={`${subjectName} icon`} />
//     <h3>{subjectName}</h3>
//   </div>
// );

// export function LandingPage() {
//     // Define your subjects and icons here
//     const subjects = [
//       { name: "Math", icon: "/path/to/math-icon.png" },
//       { name: "Science", icon: "/path/to/science-icon.png" },
//       { name: "English", icon: "/path/to/english-icon.png" },
//       // Add more subjects as needed
//     ];

//     return (
//         <div>
//             <div className="subjects-container">
//               {subjects.map((subject) => (
//                 <SubjectBox
//                   key={subject.name}
//                   subjectName={subject.name}
//                   icon={subject.icon}
//                 />
//               ))}
//             </div>
//         </div>
//     );
// }


export function LandingPage() {

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact Us</Link> {}
        <Link to="/availability">Check Availability</Link> {}
      </nav>
      <Route path="/" exact component={dashboard} />
      <Route path="/contact" component={contactPage} /> {}
      <Route path="/availability" component={scheduleTab} /> {}
    </Router>
  );
}