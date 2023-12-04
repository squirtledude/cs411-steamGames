// Games.js

import React, { useState, useEffect } from 'react';

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/games')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setGames(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Game Names</h1>
      <ul>
        {games.map(game => (
          <li key={game.GameName}>{game.GameName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Games;

