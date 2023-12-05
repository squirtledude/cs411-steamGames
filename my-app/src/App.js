// import React, { useState, useEffect } from 'react';
// import SearchBar from './SearchBar';
// import GenreDropdown from './GenreDropdown';
// import Login from './Login';
// import SignUp from './Signup';
// import Game from './GameGenre'; // Importing Game component from GameGenre.js
// import Recommendations from './Recommendation';
// import './App.css';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isSigningUp, setIsSigningUp] = useState(false);
//   const [userID, setUserID] = useState(null);
//   const [games, setGames] = useState([]);
//   const [username, setUsername] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
  
//   useEffect(() => {
//     if (isLoggedIn && userID) {
//         fetchRecommendations();
//     }
// }, [isLoggedIn, userID]);

// const fetchRecommendations = () => {
//   console.log('Fetching recommendations for userID:', userID);
//   fetch(`/api/recommendations?userID=${userID}`)
//       .then(response => response.json())
//       .then(data => {
//           console.log('Received data:', data);
//           if (data.success) {
//               setRecommendations(data.recommendations);
//           } else {
//               console.error('Failed to fetch recommendations:', data.message);
//           }
//       })
//       .catch(error => console.error('Error fetching recommendations:', error));
// };

// const handleLoginSuccess = (loggedInUsername, loggedInUserID) => {
//   console.log('Login success:', loggedInUsername, loggedInUserID);
//   setIsLoggedIn(true);
//   setUsername(loggedInUsername);
//   setUserID(loggedInUserID);
//   fetchRecommendations();
// };

//   const handleSignUpSuccess = (signedUpUsername) => {
//     setIsLoggedIn(true);
//     setIsSigningUp(false);
//     setUsername(signedUpUsername);
//   };

//   const handleSearch = (term) => {
//     fetch(`http://localhost:8080/search?term=${term}`)
//       .then(response => response.json())
//       .then(data => setGames(data))
//       .catch(error => console.error('Error:', error));
//   };

//   const handleGenreSelect = (genre) => {
//     if (!genre) {
//       setGames([]);
//       return;
//     }
//     fetch(`http://localhost:8080/games?genre=${genre}`)
//       .then(response => response.json())
//       .then(data => setGames(data))
//       .catch(error => console.error('Error:', error));
//   };

//   const toggleSignUp = () => {
//     setIsSigningUp(!isSigningUp);
//   };

//   const handleFavorite = (username, gameName) => {
//     console.log(`Attempting to update favorite game for user ${username} with game ${gameName}`);
//     fetch('http://localhost:8080/api/favorite', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, gameName }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Response from server:', data);
//       if (data.success) {
//         alert('Favorite game updated successfully');
//       } else {
//         alert('Failed to update favorite game:', data.message);
//       }
//     })
//     .catch(error => {
//       console.error('Error updating favorite game:', error);
//     });
//   };

//   if (!isLoggedIn) {
//     return (
//       <div className="App">
//         {isSigningUp ? (
//           <SignUp onSignUpSuccess={handleSignUpSuccess} />
//         ) : (
//           <Login onLoginSuccess={handleLoginSuccess} />
//         )}
//         <button onClick={toggleSignUp}>
//           {isSigningUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="background-image">
//       <div className="App">
//         <div>Welcome to the system, {username}!</div>
//         <SearchBar onSearch={handleSearch} />
//         <GenreDropdown onGenreSelect={handleGenreSelect} />
//         {games.map(game => 
//             <Game key={game.id} gameName={game.GameName} username={username} onFavorite={handleFavorite} />
//         )}
//         {isLoggedIn && <Recommendations games={recommendations} />}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import GenreDropdown from './GenreDropdown';
import Login from './Login';
import SignUp from './Signup';
import Game from './GameGenre'; // Importing Game component from GameGenre.js
import Recommendations from './Recommendation';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [userID, setUserID] = useState(null);
    const [games, setGames] = useState([]);
    const [username, setUsername] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (isLoggedIn && userID) {
            fetchRecommendations();
        }
    }, [isLoggedIn, userID]);

    // const fetchRecommendations = () => {
    //     console.log('Fetching recommendations for userID:', userID);
    //     fetch(`/api/recommendations?userID=${userID}`)
    //     .then(response => {
    //         if (!response.ok) {
    //           throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //           return response.json();
    //         })
    //         .then(data => {
    //             console.log('Received data:', data);
    //             if (data.success) {
    //                 setRecommendations(data.recommendations);
    //             } else {
    //                 console.error('Failed to fetch recommendations:', data.message);
    //             }
    //         })
    //         .catch(error => console.error('Error fetching recommendations:', error));
    // };
  //   const fetchRecommendations = () => {
  //     console.log('Fetching recommendations for userID:', userID);
  //     fetch(`http://localhost:8080/api/recs?userID=${userID}`)
  //         .then(response => {
  //             if (!response.ok) {
  //                 throw new Error(`HTTP error! Status: ${response.status}`);
  //             }
  //             return response.text(); // Temporarily use text to see what is returned
  //         })
  //         .then(data => {
  //             console.log('Received data:', data); // Check what's being returned here
  //             // Convert data back to JSON here, after ensuring it's correct
  //         })
  //         .catch(error => console.error('Error fetching recommendations:', error));
  // };

//   const fetchRecommendations = () => {
//     console.log('Fetching recommendations for userID:', userID);
//     fetch(`http://localhost:8080/api/recs?userID=${userID}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log('Received data:', data);
//             if (data.success) {
//                 // Map the array of objects to an array of strings (game names)
//                 const gameNames = data.recommendations.map(item => item.RecommendedGameName);
//                 setRecommendations(gameNames);
//             } else {
//                 console.error('Failed to fetch recommendations:', data.message);
//             }
//         })
//         .catch(error => console.error('Error fetching recommendations:', error));
// };

const fetchRecommendations = () => {
  if (userID) { // Check if userID is not null or undefined
      console.log('Fetching recommendations for userID:', userID);
      fetch(`http://localhost:8080/api/recs?userID=${userID}`)
          .then(response => response.json())
          .then(data => {
              console.log('Received data:', data);
              if (data.success) {
                  setRecommendations(data.recommendations);
              } else {
                  console.error('Failed to fetch recommendations:', data.message);
              }
          })
          .catch(error => console.error('Error fetching recommendations:', error));
  } else {
      console.log('UserID is null, skipping fetch');
  }
};

  


    const handleLoginSuccess = (loggedInUsername, loggedInUserID) => {
      console.log('Login success:', loggedInUsername, loggedInUserID);
      setIsLoggedIn(true);
      setUsername(loggedInUsername);
      setUserID(loggedInUserID); // Make sure loggedInUserID is not null
      fetchRecommendations();
  };
  
  const handleSignUpSuccess = (signedUpUsername, signedUpUserID) => {
      console.log('Signup success:', signedUpUsername, signedUpUserID);
      setIsLoggedIn(true);
      setIsSigningUp(false);
      setUsername(signedUpUsername);
      setUserID(signedUpUserID); // Make sure signedUpUserID is not null
      fetchRecommendations();
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

    const handleFavorite = (username, gameName) => {
        console.log(`Attempting to update favorite game for user ${username} with game ${gameName}`);
        fetch('http://localhost:8080/api/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, gameName }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
            if (data.success) {
                alert('Favorite game updated successfully');
            } else {
                alert('Failed to update favorite game:', data.message);
            }
        })
        .catch(error => {
            console.error('Error updating favorite game:', error);
        });
    };

    return (
        <div className="background-image">
            <div className="App">
                {!isLoggedIn ? (
                    <div>
                        {isSigningUp ? (
                            <SignUp onSignUpSuccess={handleSignUpSuccess} />
                        ) : (
                            <Login onLoginSuccess={handleLoginSuccess} />
                        )}
                        <button onClick={toggleSignUp}>
                            {isSigningUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                ) : (
                    <div>
                        <div>Welcome to the system, {username}!</div>
                        <SearchBar onSearch={handleSearch} />
                        <GenreDropdown onGenreSelect={handleGenreSelect} />
                        {games.map(game => 
                            <Game key={game.id} gameName={game.GameName} username={username} onFavorite={handleFavorite} />
                        )}
                        <Recommendations games={recommendations} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
