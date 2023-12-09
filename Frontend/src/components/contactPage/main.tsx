import React, { useState } from 'react';
import './main.css';
function ContactPage() {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(contactInfo);
    alert('Thank you for contacting us!');
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={contactInfo.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={contactInfo.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Message:
          <textarea name="message" value={contactInfo.message} onChange={handleChange}></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactPage;
