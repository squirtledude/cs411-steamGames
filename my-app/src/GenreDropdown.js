// import React from 'react';

// const GenreDropdown = () => {
//   const genreOptions = ["Action", "Indie", "Adventure", "Casual", "Strategy", "RPG", "Simulation", "Early Access", "FreeToPlay", "Sports", "Racing", "MassivelyMultiplayer"];

//   return (
//     <div>
//       <label htmlFor="genre-dropdown">Categories: </label>
//       <select id="genre-dropdown">
//         {genreOptions.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default GenreDropdown;

// GenreDropdown.js

import React, { useState } from 'react';

const GenreDropdown = ({ onGenreSelect }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const genreOptions = ["GenreIsAction", "GenreIsIndie", "GenreIsAdventure", "GenreIsCasual", "GenreIsStrategy", "GenreIsRPG", "GenreIsSimulation", "GenreIsEarlyAccess", "GenreIsFreeToPlay", "GenreIsSports", "GenreIsRacing", "GenreIsMassivelyMultiplayer"];

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
    onGenreSelect(event.target.value); // Pass the selected genre to the parent component
  };

  return (
    <div>
      <label htmlFor="genre-dropdown">Categories: </label>
      <select id="genre-dropdown" value={selectedGenre} onChange={handleChange}>
        <option value="">Select a genre</option>
        {genreOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreDropdown;

