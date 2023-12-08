import React from 'react';
import './main.css';
const SearchResult = ({ results }) => {
  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <h3>{result.name}</h3>
          <p>Subjects: {result.subjects.join(', ')}</p>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
