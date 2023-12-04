// Recommendations.js

import React from 'react';

const Recommendations = ({ games }) => {
    return (
        <div className="recommendations">
            <h2>Recommended Games</h2>
            <ul>
                {games.map((game, index) => <li key={index}>{game}</li>)}
            </ul>
        </div>
    );
};

export default Recommendations;

