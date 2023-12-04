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

// app.get('/games', (req, res) => {
//   const query = `
//     SELECT MyGames.GameName, Genre.GenreIsAction AS Action, Genre.GenreIsIndie AS Indie 
//     FROM MyGames
//     JOIN Genre ON MyGames.GameGenreId = Genre.GenreId
//     WHERE Genre.GenreIsAction LIKE 'TRUE'
//     UNION
//     SELECT MyGames.GameName, Genre.GenreIsAction AS Action, Genre.GenreIsIndie AS Indie 
//     FROM MyGames
//     JOIN Genre ON MyGames.GameGenreId = Genre.GenreId
//     WHERE Genre.GenreIsIndie LIKE 'TRUE'
//     LIMIT 25
//   `;

//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).send('Error executing the query');
//       throw err;
//     }
//     res.json(results);
//   });
// });

// In your server.js or a similar file

// In your server.js

app.get('/games', (req, res) => {
  let genre = req.query.genre;
  let query;

  if (genre) {
    query = `SELECT MyGames.GameName FROM MyGames JOIN Genre ON MyGames.GameGenreID = Genre.GenreID WHERE ${genre} = 'TRUE' ORDER BY MyGames.MetacriticScore DESC LIMIT 50`;
  } else {
    query = `SELECT * FROM MyGames`; // Or any default query
  }

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching games');
      throw err;
    }
    res.json(results);
  });
});


app.get('/search', (req, res) => {
  let searchTerm = req.query.term;
  // Replace this query with the one suitable for your database schema
  const query = `
    SELECT * FROM MyGames
    WHERE GameName LIKE ?
    ORDER BY MetacriticScore DESC`;

  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      res.status(500).send('Error executing the search query');
      throw err;
    }
    res.json(results);
  });
});

app.get('/genres', (req, res) => {
  const query = 'SELECT * FROM Genre'; // Adjust the query according to your database schema
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching genres');
      throw err;
    }
    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
