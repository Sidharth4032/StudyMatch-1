import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import './main.css';

const App = () => {
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <div>
      <h1>Review System</h1>
      <ReviewForm onReviewSubmit={handleReviewSubmit} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default App;
