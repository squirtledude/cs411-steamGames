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

app.get('/genres', (req, res) => {
  const query = 'SELECT * FROM Genre';
  db.query(query, (err, results) => {
    if (err) throw err;
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


//starting up the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
