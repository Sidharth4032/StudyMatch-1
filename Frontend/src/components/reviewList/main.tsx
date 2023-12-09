import React from 'react';
import Review from './Review';
import './main.css';
const ReviewList = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </div>
  );
};

