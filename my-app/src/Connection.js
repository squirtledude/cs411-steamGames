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
  host: '34.71.31.136',
  user: 'root',
  password: 'brainbash2023',
  database: 'NBAPlayerStats'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});