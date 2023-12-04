// App.js or another component

import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Games from './GameGenre'; // Assuming you have a Games component to display results
import GenreDropdown from './GenreDropdown';

const App = () => {
  const [games, setGames] = useState([]);

  const handleSearch = (term) => {
    fetch(`http://localhost:8080/search?term=${term}`)
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error:', error));
  };

  const handleGenreSelect = (genre) => {
    if (!genre) {
      setGames([]);
      return;
    }
    fetch(`http://localhost:8080/games?genre=${genre}`)
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <Games games={games} />
      <GenreDropdown onGenreSelect={handleGenreSelect} />
    </div>
  );
};

export default App;




