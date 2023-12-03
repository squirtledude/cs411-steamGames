// Genres.js

import React, { useState, useEffect } from 'react';

const Genres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/genres')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setGenres(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Genres</h1>
      <ul>
        {genres.map(genre => (
          <li key={genre.GenreId}>{genre.GenreIsAction} {/* Replace GenreIsAction with the correct field name */}</li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
