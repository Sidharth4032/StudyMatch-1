import React, { useState } from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';
import './main.css';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setError(null);

    try {

      const response = await fetch(`your-api-url?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Find Study Partners</h1>
      <SearchForm onSearch={handleSearch} />
      
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && results.length === 0 && <p>No results found</p>}

      <SearchResult results={results} />
    </div>
  );
};

export default SearchPage;
