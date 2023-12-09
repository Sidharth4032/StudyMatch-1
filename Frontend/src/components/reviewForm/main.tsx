import React, { useState } from 'react';
import './main.css';

const ReviewForm = ({ onReviewSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onReviewSubmit({ rating, comment });
    setRating(5);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating: </label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <label>Comment: </label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};
