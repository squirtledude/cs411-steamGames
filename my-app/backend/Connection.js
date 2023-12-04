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

//create end point login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check user credentials (replace with your actual table and column names)
  const query = 'SELECT * FROM users WHERE username = ?';

  connection.query(query, [username], (error, results) => {
      if (error) {
          // handle error
          return res.status(500).send({ message: 'Server error' });
      }

      if (results.length > 0) {
          // Compare the hashed password
          // Use a hashing library like bcrypt to compare the password
          // bcrypt.compare(password, results[0].password_hash, (err, isMatch) => {...})

          res.send({ message: 'Login successful' });
      } else {
          res.status(401).send({ message: 'Invalid credentials' });
      }
  });
});

app.post('/addFavoriteGame', (req, res) => {
  const userId = req.body.userId;
  const newGame = req.body.newGame;

  const query = `
      UPDATE User
      SET 
          FavGame_One = CASE 
              WHEN FavGame_One IS NULL THEN ${connection.escape(newGame)} 
              ELSE FavGame_One 
          END,
          FavGame_Two = CASE 
              WHEN FavGame_One IS NOT NULL AND FavGame_Two IS NULL THEN ${connection.escape(newGame)}
              ELSE FavGame_Two 
          END,
          FavGame_Three = CASE 
              WHEN FavGame_Two IS NOT NULL AND FavGame_Three IS NULL THEN ${connection.escape(newGame)}
              ELSE FavGame_Two 
          END,
          FavGame_Four = CASE 
              WHEN FavGame_Three IS NOT NULL AND FavGame_Four IS NULL THEN ${connection.escape(newGame)}
              ELSE FavGame_Two 
          END,
          FavGame_Five = CASE 
              WHEN FavGame_Four IS NOT NULL AND FavGame_Five IS NULL THEN ${connection.escape(newGame)}
              ELSE FavGame_Two 
          END,  
          FavGame_Six = CASE 
              WHEN FavGame_Five IS NOT NULL AND FavGame_Six IS NULL THEN ${connection.escape(newGame)}
              ELSE FavGame_Two 
          END,
          FavGame_Seven = CASE 
              WHEN FavGame_Six IS NOT NULL AND FavGame_Seven IS NULL THEN ${connection.escape(newGame)}
              ELSE FavGame_Two 
          END,
          FavGame_Eight = CASE 
              WHEN FavGame_Seven IS NOT NULL AND FavGame_Eight IS NULL THEN ${connection.escape(newGame)}
              ELSE FavGame_Two 
          END,
          FavGame_Nine = CASE 
              WHEN FavGame_Eight IS NOT NULL AND FavGame_Nine IS NULL THEN ${connection.escape(newGame)}
              ELSE FavGame_Two 
          END,        
          FavGame_Ten = CASE 
              WHEN FavGame_Nine IS NOT NULL AND FavGame_Ten IS NULL THEN ${connection.escape(newGame)} 
              ELSE FavGame_Ten 
          END
      WHERE UserId = ${connection.escape(userId)};
  `;

  connection.query(query, (error, results, fields) => {
      if (error) throw error;
      res.send('Favorite game added successfully.');
  });
});


//starting up the server

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
