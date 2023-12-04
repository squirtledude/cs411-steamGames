// App.js

import React from 'react';
import Genres from './GameGenre'; // Import the Genres component
import Login from './Login';
import './App.css';

const App = () => {
  return (
    <div className="background-image"> {/* Apply the background image class */}
      <div className="App">
        <h1>Game Genres</h1>
        <Genres /> {/* Render the Genres component */}
      </div>
    </div>
  );
};

export default App;
