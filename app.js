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
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
PORT = 60364;                 // Set a port number at the top so it's easy to change in the future



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

        res.render('F1Seasons', { data: rows });              // Render the index.hbs file, and also send the renderer
    })                                                        // an object where 'data' is equal to the 'rows' we
});                                                           // received back from the query

app.get('/GrandPrix.hbs', function (req, res) {
    let query1 = "SELECT * FROM `Grand_Prix`;";               // Define our query
    let query2 = "SELECT * FROM `F1_Seasons`;";

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        let races = rows

        db.pool.query(query2, (error, rows, fields) => {

            let seasons = rows;
            return res.render('GrandPrix', { data: races, seasons: seasons });  // Render the index.hbs file, and also send the renderer
        })                                                                      // an object where 'data' is equal to the 'rows' we
    })                                                                         // received back from the query
});

app.get('/Teams.hbs', function (req, res) {
    let query1 = "SELECT * FROM `Teams`;";                    // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('Teams', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })                                                        // an object where 'data' is equal to the 'rows' we
});                                                           // received back from the query

app.get('/Drivers.hbs', function (req, res) {
    let query1 = "SELECT * FROM `Drivers`;";                  // Define our query

    let query2 = "SELECT * FROM `Teams`;";

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        let drivers = rows

        db.pool.query(query2, (error, rows, fields) => {

            let teams = rows;
            return res.render('Drivers', { data: drivers, teams: teams });
        })                                                   // Render the index.hbs file, and also send the renderer                                                
    })                                                       // an object where 'data' is equal to the 'rows' we
});                                                          // received back from the query

app.get('/Principals.hbs', function (req, res) {
    let query1 = "SELECT * FROM `Principals`;";               // Define our query
    let query2 = "SELECT * FROM `Teams`;";

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        let principals = rows

        db.pool.query(query2, (error, rows, fields) => {

            // Save the Teams
            let teams = rows;
            return res.render('Principals', { data: principals, teams: teams });
        })

    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query


app.get('/GrandPrixTeams.hbs', function (req, res) {
    let query1 = "SELECT F1_Seasons.year , `Grand_Prix`.race_name, Teams.team_name FROM `Grand_Prix_has_Teams` JOIN `Grand_Prix` ON `Grand_Prix_has_Teams`.`Grand_Prix_race_id` = `Grand_Prix`.race_id JOIN Teams ON `Grand_Prix_has_Teams`.Teams_team_id = Teams.team_id JOIN `F1_Seasons` on `Grand_Prix`.`F1_Seasons_season_id` = `F1_Seasons`.season_id;";               // Define our query
    let query2 = "SELECT F1_Seasons.year, Grand_Prix.race_name, Grand_Prix.race_id, Grand_Prix.F1_Seasons_season_id FROM Grand_Prix JOIN F1_Seasons ON Grand_Prix.F1_Seasons_season_id = F1_Seasons.season_id;";
    let query3 = "SELECT * FROM `Teams`;";

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        let join = rows

        db.pool.query(query2, (error, rows, fields) => {

            let races = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let team = rows;

                res.render('GrandPrixTeams', { data: join, races: races, team, team });                  // Render the index.hbs file, and also send the renderer
            })                                                                                           // an object where 'data' is equal to the 'rows' we
        })
    })
});


// POST ROUTES
app.post('/add_team', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Teams (team_name, team_country, car_model) VALUES ('${data.team_name}', '${data.team_country}', '${data.car_model}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Teams
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


app.post('/add_principal', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO Principals (principal_name, Teams_team_id) VALUES ('${data.principal_name}', '${data.Teams_team_id}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Principals
            query2 = `SELECT * FROM Principals;`;
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

app.post('/add_season', function (req, res) {
    let data = req.body;

    query1 = `INSERT INTO F1_Seasons (num_races, year) VALUES ('${data.num_races}', '${data.year}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on F1_Seasons
            query2 = `SELECT * FROM F1_Seasons;`;
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


app.post('/add_grand_prix', function (req, res) {
    let data = req.body;
    let distance_per_lap_FLOAT = parseFloat(data.distance_per_lap);
    let num_laps_INT = parseInt(data.num_laps);
    let has_sprint_INT = parseInt(data.has_sprint);
    let F1_Seasons_season_id_INT = parseInt(data.F1_Seasons_season_id);


    query1 = `INSERT INTO Grand_Prix (race_name, distance_per_lap, num_laps, has_sprint, F1_Seasons_season_id) VALUES ( '${data.race_name}', '${distance_per_lap_FLOAT}', '${num_laps_INT}', '${has_sprint_INT}', '${F1_Seasons_season_id_INT}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Grand_Prix
            query2 = `SELECT * FROM Grand_Prix;`;
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



app.delete('/delete_team', function (req, res, next) {
    let data = req.body;
    let teamID = parseInt(data.team_id);
    let deleteTeam = `DELETE FROM Teams WHERE team_id = ?`;


    // Run the 1st query
    db.pool.query(deleteTeam, [teamID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});


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

app.post('/add_driver', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let points = parseInt(data.lifetime_points);
    if (isNaN(points)) {
        points = 'NULL'
    }

    let wins = parseInt(data.lifetime_wins);
    if (isNaN(wins)) {
        wins = 'NULL'
    }

    let poles = parseInt(data.lifetime_poles);
    if (isNaN(poles)) {
        poles = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Drivers (driver_name, driver_country, lifetime_points, lifetime_wins, lifetime_poles, Teams_team_id) VALUES ('${data.driver_name}', '${data.driver_country}', ${points}, ${wins}, ${poles}, ${data.Teams_team_id})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Drivers
            query2 = `SELECT * FROM Drivers;`;
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


app.delete('/delete_driver', function (req, res, next) {
    let data = req.body;
    let driver_id = parseInt(data.driver_id);
    let deleteDriver = `DELETE FROM Drivers WHERE driver_id = ?`;


    // Run the 1st query
    db.pool.query(deleteDriver, [driver_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

app.put('/update_driver', function (req, res, next) {
    let data = req.body;

    let driver_id = parseInt(data.driver_id);
    let driver_name = data.driver_name;
    let driver_country = data.driver_country;
    let lifetime_points = parseInt(data.lifetime_points);
    let lifetime_wins = parseInt(data.lifetime_wins);
    let lifetime_poles = parseInt(data.lifetime_poles);
    let Teams_team_id = parseInt(data.Teams_team_id)

    let queryUpdateDriver = `UPDATE Drivers SET driver_name = ?, driver_country = ?, lifetime_points = ?, lifetime_wins = ?, lifetime_poles = ?, Teams_team_id = ? WHERE Drivers.driver_id = ?`;


    // Run the 1st query
    db.pool.query(queryUpdateDriver, [driver_name, driver_country, lifetime_points, lifetime_wins, lifetime_poles, Teams_team_id, driver_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the Drivers
        // table on the front-end
        else {
            res.send(rows)
        }
    })
});

app.post('/add_GrandPrixTeam', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    console.log('Made it to POST')

    // Create the query and run it on the database
    query1 = `INSERT INTO Grand_Prix_has_Teams (Grand_Prix_race_id, Teams_team_id) VALUES ('${data.race_id}', '${data.team_id}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a JOIN on Grand_Prix_has_Teams
            console.log('Made it to Query2')
            query2 = "SELECT F1_Seasons.year , `Grand_Prix`.race_name, Teams.team_name FROM `Grand_Prix_has_Teams` JOIN `Grand_Prix` ON `Grand_Prix_has_Teams`.`Grand_Prix_race_id` = `Grand_Prix`.race_id JOIN Teams ON `Grand_Prix_has_Teams`.Teams_team_id = Teams.team_id JOIN `F1_Seasons` on `Grand_Prix`.`F1_Seasons_season_id` = `F1_Seasons`.season_id;";
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



/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
