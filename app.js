// Citation for the following code:
// Date: 06/26/2023
// Copied from
// OSU Course CS340 Intro to Databases Activity 2. Modified slightly to have a unique port
// Source URL: https://canvas.oregonstate.edu/courses/1922991/assignments/9287060?module_item_id=23329570 

/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 60351;                 // Set a port number at the top so it's easy to change in the future



// Database
var db = require('./db-connector')



/*
    ROUTES
*/
app.get('/', function (req, res) {
    // Define our queries
    query1 = 'DROP TABLE IF EXISTS diagnostic;';
    query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
    query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working! TESTING test again")';
    query4 = 'SELECT * FROM diagnostic;';

    // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

    // DROP TABLE...
    db.pool.query(query1, function (err, results, fields) {

        // CREATE TABLE...
        db.pool.query(query2, function (err, results, fields) {

            // INSERT INTO...
            db.pool.query(query3, function (err, results, fields) {

                // SELECT *...
                db.pool.query(query4, function (err, results, fields) {

                    // Send the results to the browser
                    let base = "<h1>MySQL Results:</h1>"
                    res.send(base + JSON.stringify(results));
                });
            });
        });
    });
});


/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});