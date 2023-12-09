import React from 'react';
import './main.css';
// This is a functional component for the Help Page
function HelpPage() {
  return (
    <div className="help-page">
      <h1>Help & Support</h1>
      
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          <h3>How do I reset my password?</h3>
          <p>[Password reset instructions]</p>
        </div>
        <div className="faq">
          <h3>How can I contact customer support?</h3>
          <p>[Contact details or process]</p>
        </div>
        {/* Add more FAQs as needed */}
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>If you need further assistance, please don't hesitate to contact us.</p>
        <p>Email: support@example.com</p>
        <p>Phone: 123-456-7890</p>
      </section>

      <section className="additional-resources">
        <h2>Additional Resources</h2>
        <a href="/user-guide">User Guide</a>
        <a href="/troubleshooting">Troubleshooting Tips</a>
        {/* More links or resources as needed */}
      </section>
    </div>
  );
}

export default HelpPage;
