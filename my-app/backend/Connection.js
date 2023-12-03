const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(express.json());  // Parse JSON bodies (as sent by API clients)


const corsOptions = {
  origin: 'http://localhost:3000', // URL of the React app that is allowed to connect to this server
  methods: ['GET', 'POST'],
  credentials: true, 
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));     

const db = mysql.createConnection({   // Create a connection to the database
  host: '34.170.112.72',  // 34.71.31.136
  user: 'root',
  // password: '',
  database: 'games'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

//creating an endpoint
// In your server.js or a similar file where you set up routes

app.get('/games', (req, res) => {
  const query = `
    SELECT MyGames.GameName, Genre.GenreIsAction AS Action, Genre.GenreIsIndie AS Indie 
    FROM MyGames
    JOIN Genre ON MyGames.GameGenreId = Genre.GenreId
    WHERE Genre.GenreIsAction LIKE 'TRUE'
    UNION
    SELECT MyGames.GameName, Genre.GenreIsAction AS Action, Genre.GenreIsIndie AS Indie 
    FROM MyGames
    JOIN Genre ON MyGames.GameGenreId = Genre.GenreId
    WHERE Genre.GenreIsIndie LIKE 'TRUE'
    LIMIT 25
  `;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error executing the query');
      throw err;
    }
    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
