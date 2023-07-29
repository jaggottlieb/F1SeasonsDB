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
PORT = 60312;                 // Set a port number at the top so it's easy to change in the future



// Database
var db = require('./database/db-connector.js')

// Handlebars

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

//
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));




/*
    ROUTES
*/
app.get('/', (request, response) => {
    response.render('index');
});

app.get('/F1Seasons.hbs', function (req, res) {
    let query1 = "SELECT * FROM `F1_Seasons`;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('F1Seasons', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.get('/GrandPrix.hbs', function (req, res) {
    let query1 = "SELECT * FROM `Grand_Prix`;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('GrandPrix', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.get('/Teams.hbs', function (req, res) {
    let query1 = "SELECT * FROM `Teams`;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('Teams', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.get('/Drivers.hbs', function (req, res) {
    let query1 = "SELECT * FROM `Drivers`;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('Drivers', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.get('/Principals.hbs', function (req, res) {
    let query1 = "SELECT * FROM `Principals`;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('Principals', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

// POST ROUTES
app.post('/add-team', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    // Create the query and run it on the database
    query1 = `INSERT INTO Teams (team_name, team_country, car_model) VALUES ('${data.team_name}', '${data.team_country}', ${data.car_model})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Teams;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// app.get('/', function (req, res) {
//     // Define our queries
//     query1 = 'DROP TABLE IF EXISTS diagnostic;';
//     query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
//     query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
//     query4 = 'SELECT * FROM diagnostic;';

//     // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

//     // DROP TABLE...
//     db.pool.query(query1, function (err, results, fields) {

//         // CREATE TABLE...
//         db.pool.query(query2, function (err, results, fields) {

//             // INSERT INTO...
//             db.pool.query(query3, function (err, results, fields) {

//                 // SELECT *...
//                 db.pool.query(query4, function (err, results, fields) {

//                     // Send the results to the browser
//                     let base = "<h1>MySQL Results:</h1>"
//                     res.send(base + JSON.stringify(results));
//                 });
//             });
//         });
//     });
// });


/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
