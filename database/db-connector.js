// Citation for the following functions:
// Date: 06/26/2023
// Copied from
// OSU Course CS340 Intro to Databases Activity 2. Modified slightly to include my credentials
// Source URL: https://canvas.oregonstate.edu/courses/1922991/assignments/9287060?module_item_id=23329570 

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: '*',
    password: '*',
    database: '*'
})

// Export it for use in our application
module.exports.pool = pool;

