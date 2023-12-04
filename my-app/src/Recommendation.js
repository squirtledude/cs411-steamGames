// Recommendations.js

import React from 'react';

const Recommendations = ({ games }) => {
    return (
        <div className="recommendations">
            <h2>Recommended Games</h2>
            {games.map((game, index) => (
                <div key={index}>{game.RecommendedGameName}</div>
            ))}
        </div>
    );
};

export default Recommendations;
