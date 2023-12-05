import React from 'react';

const Game = ({ gameName, metacriticScore, username, onFavorite }) => {
  const handleFavorite = () => {
    onFavorite(username, gameName);
  };

  return (
    <div className="game-item">
      <span className="game-name">{gameName}</span>
      <div className="score">Score: {metacriticScore}</div>
      <button onClick={handleFavorite} className="favorite-button">⭐</button>
    </div>
  );
};


export default Game;
