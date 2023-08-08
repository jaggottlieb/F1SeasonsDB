// Citation for the following code:
// Date: 07/31/2023
// Copied from
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 60351;                 // Set a port number at the top so it's easy to change in the future
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
PORT = 60352;                 // Set a port number at the top so it's easy to change in the future



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

        let teams = rows;

        return res.render('Teams', { data: teams });                  // Render the index.hbs file, and also send the renderer
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
app.post('/add_team', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    // Create the query and run it on the database
    query1 = `INSERT INTO Teams (team_name, team_country, car_model) VALUES ('${data['team_name']}', '${data['team_country']}', '${data['car_model']}')`;
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




app.delete('/delete-team-ajax/', function(req,res,next){
    let data = req.body;
    let teamID = parseInt(data.team_id);
    let deleteTeam = `DELETE FROM Teams WHERE team_id = ?`;
    
          // Run the 1st query
          db.pool.query(deleteTeam, [teamID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {

              }
  })});


  app.put('/put-team-ajax', function(req,res,next){
    let data = req.body;
    
    let team_id = parseInt(data.team_id)
    let team_name = data.team_name;
    let team_country = data.team_country;
    let team_model = data.team_model;
  
    let queryUpdateTeam = `UPDATE Teams SET team_name = ?, team_country = ?, team_model = ? WHERE Teams.team_id = ?`;

    
  
          // Run the 1st query
          db.pool.query(queryUpdateTeam, [team_id, team_name, team_country, team_model], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  

  })});

// app.get('/', function (req, res) {
//     // Define our queries
//     query1 = 'DROP TABLE IF EXISTS diagnostic;';
//     query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
//     query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
//     query4 = 'SELECT * FROM diagnostic;';

app.put('/update_team', function (req, res, next) {
    let data = req.body;

    let team_id = parseInt(data.team_id)
    let team_name = data.team_name;
    let team_country = data.team_country;
    let car_model = data.car_model;

    let queryUpdateTeam = `UPDATE Teams SET team_name = ?, team_country = ?, car_model = ? WHERE Teams.team_id = ?`;

    // Run the 1st query
    db.pool.query(queryUpdateTeam, [team_name, team_country, car_model, team_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, return that data so we can use it to update the people's
        // table on the front-end
        else {
            res.send(rows)
        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
