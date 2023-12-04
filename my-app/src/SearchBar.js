// // SearchBar.js

// import React, { useState } from 'react';

// const SearchBar = ({ onSearch }) => {
//   const [term, setTerm] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(term);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={term}
//         onChange={(e) => setTerm(e.target.value)}
//         placeholder="Search games..."
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchBar;

// SearchBar.js

import React, { useState } from 'react';
import './SearchBar.css'; // Import CSS file

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <div className="search-bar-container"> {/* Add a container */}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search games..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
