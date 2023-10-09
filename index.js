const mysql = require("mysql2");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the 'path' module

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000000000",
    database: "admin"
});

con.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
});

app.get('/', (req, res) => {
    // Use 'path.join()' to specify the correct file path
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Corrected path
});

app.post('/submit', (req, res) => {
    const { username, email, job, contact, address, city, state } = req.body;

    const employeeSql = 'INSERT INTO employee (username, email, job, contact, address, city, state) VALUES (username, email, job,contact,address, city, state)';
    
    // Use placeholders and provide values as an array
    con.query(employeeSql, [ username, email, job, contact, address, city, state], (err, result) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
            res.status(500).send('Error submitting the form');
            return;
        }
        console.log('Form data inserted into the database');
        res.send('Form submitted successfully');
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
