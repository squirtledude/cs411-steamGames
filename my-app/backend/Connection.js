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

app.get('/games', (req, res) => {
  let genre = req.query.genre;
  let query;

  if (genre) {
    query = `SELECT DISTINCT MyGames.GameName, MyGames.MetacriticScore FROM MyGames JOIN Genre ON MyGames.GameGenreID = Genre.GenreID WHERE ${genre} = 'TRUE' ORDER BY MyGames.MetacriticScore DESC LIMIT 50`;
  } else {
    query = `SELECT MyGames.GameName, MyGames.MetacriticScore FROM MyGames LIMIT 50`; // Or any default query
  }
  
  

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching games');
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

// this prob isnt needed
// app.get('/genres', (req, res) => {
//   const query = 'SELECT * FROM Genre'; // Adjust the query according to your database schema
//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).send('Error fetching genres');
//       throw err;
//     }
//     res.json(results);
//   });
// });

//login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM User WHERE UserName = ? AND Password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error executing the query' });
      return;
    }
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  const insertQuery = 'INSERT INTO User (UserName, Password) VALUES (?, ?)';

  db.query(insertQuery, [username, password], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // Username already exists
        res.status(409).json({ success: false, message: 'Username already exists' });
      } else {
        // Other errors
        console.error('Error inserting user:', err.message);
        res.status(500).json({ success: false, message: 'Error signing up the user' });
      }
      return;
    }
    res.json({ success: true, message: 'Signup successful' });
  });
});

app.post('/api/favorite', (req, res) => {
  const { username, gameName } = req.body;
  
  // Query to find the first null favorite game column
  const findQuery = `
    SELECT 
      IF(Favgame_one IS NULL, 'Favgame_one',
        IF(Favgame_two IS NULL, 'Favgame_two',
          IF(Favgame_three IS NULL, 'Favgame_three',
            IF(Favgame_four IS NULL, 'Favgame_four',
              IF(Favgame_five IS NULL, 'Favgame_five',
                IF(Favgame_six IS NULL, 'Favgame_six',
                  IF(Favgame_seven IS NULL, 'Favgame_seven',
                    IF(Favgame_eight IS NULL, 'Favgame_eight',
                      IF(Favgame_nine IS NULL, 'Favgame_nine',
                        IF(Favgame_ten IS NULL, 'Favgame_ten', NULL)
  ))))))))) AS firstNullFav 
    FROM User WHERE UserName = ?`;

  db.query(findQuery, [username], (err, results) => {
    if (err) {
      console.error('Error finding first null favorite:', err.message);
      res.status(500).json({ success: false, message: 'Error finding favorite' });
      return;
    }
    if (results.length > 0 && results[0].firstNullFav !== null) {
      const firstNullFav = results[0].firstNullFav;
      
      // Update query to set the first null favorite game column
      const updateQuery = `UPDATE User SET ${firstNullFav} = ? WHERE UserName = ?`;

      db.query(updateQuery, [gameName, username], (updateErr, updateResults) => {
        if (updateErr) {
          console.error('Error updating favorite game:', updateErr.message);
          res.status(500).json({ success: false, message: 'Error updating favorite game' });
          return;
        }
        res.json({ success: true, message: 'Favorite game updated successfully' });
      });
    } else {
      res.json({ success: false, message: 'All favorite game slots are filled' });
    }
  });
});

app.get('/api/recommendations', (req, res) => {
  const userID = parseInt(req.query.userID, 10);

  if (isNaN(userID)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
  }

  const query = 'SELECT RecommendedGameName FROM Recommendations WHERE UserID = ?';
  db.query(query, [userID], (err, results) => {
      if (err) {
          console.error('Error fetching recommendations:', err.message);
          return res.status(500).json({ success: false, message: 'Error fetching recommendations' });
      }
      res.json({ success: true, recommendations: results.map(row => row.RecommendedGameName) });
  });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
