const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234567890",
    database: "admin" // Change to your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.message);
    } else {
        console.log('Connected to the database');
    }
});

app.use(express.static('public'));

app.post('/submit', (req, res) => {
    console.log('hi');
    const { username, email, job, contact, address, city, state } = req.body;

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
