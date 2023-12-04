// App.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Games from './GameGenre'; // Assuming this is your component to display games
import GenreDropdown from './GenreDropdown';
import Login from './Login';
import SignUp from './Signup';
import './App.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [games, setGames] = useState([]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleSignUpSuccess = () => {
    setIsLoggedIn(true);
    setIsSigningUp(false); // Hide the signup form after successful signup
  };

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

  const toggleSignUp = () => {
    setIsSigningUp(!isSigningUp);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        {isSigningUp ? (
          <SignUp onSignUpSuccess={handleSignUpSuccess} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
        <button onClick={toggleSignUp}>
          {isSigningUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    );
  }

  return (
    <div className="background-image">
      <div className="App">
        <div>Welcome to the system!</div>
        <SearchBar onSearch={handleSearch} />
        <GenreDropdown onGenreSelect={handleGenreSelect} />
        <Games games={games} />
        {/* You can also include a logout button here */}
      </div>
    </div>
  );
};

export default App;






