// Citation for the following code:
// Date: 08/08/2023
// Copied From
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify

let addGrandPrixTeam = document.getElementById('add_GrandPrixTeam_form');

// Modify the objects we need
addGrandPrixTeam.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let addRaceID = document.getElementById("add_race_id");
    let addTeamID = document.getElementById("add_team_id");

    // Get the values from the form fields
    let raceIDValue = addRaceID.value;
    let teamIDValue = addTeamID.value;

    // Put our data we want to send in a javascript object
    let data = {
        race_id: raceIDValue,
        team_id: teamIDValue,
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_GrandPrixTeam", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            addRaceID.value = 'Select a Race';
            addTeamID.value = 'Select a Race';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Grand_Prix_has_Teams
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("GrandPrixTeams_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let yearCell = document.createElement("TD");
    let raceNameCell = document.createElement("TD");
    let teamNameCell = document.createElement("TD");

    // Fill the cells with correct data
    yearCell.innerText = newRow.year;
    raceNameCell.innerText = newRow.race_name;
    teamNameCell.innerText = newRow.team_name;

    // Add the cells to the row 
    row.appendChild(yearCell);
    row.appendChild(raceNameCell);
    row.appendChild(teamNameCell);

    // Add the row to the table
    currentTable.appendChild(row);
}