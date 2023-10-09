
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Create a connection to your MySQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000000000",
    database: "admin" // Change to your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.message);
    } else {
        console.log('Connected to the database');
    }
});

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (HTML, CSS, etc.) from a "public" folder
app.use(express.static('public'));

// Handle form submissions
app.post('/submit', (req, res) => {
    const { username, email, job, contact, address, city, state, } = req.body;


    // Insert the form data into the database
    const sql = 'INSERT INTO employee (username, email, job, contact, address, city, state) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [username, email, job, contact, address, city, state], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database: ' + err.message);
            res.status(500).send('Internal server error');
        } else {
            console.log('Data inserted into the database');
            res.send('Thank you for submitting the form!');
        }
    });
   
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


