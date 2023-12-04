import React from 'react';

const Game = ({ gameName, username, onFavorite }) => {
  const handleFavorite = () => {
    onFavorite(username, gameName);
  };

  return (
    <div className="game-item">
      <span>{gameName}</span>
      <button onClick={handleFavorite} className="favorite-button">⭐</button> {/* Star Icon */}
    </div>
  );
};

export default Game;




