// Citation for the following code:
// Date: 07/31/2023
// Copied From
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addTeamForm = document.getElementById('add_team_form');

// Modify the objects we need
addTeamForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let addTeamName = document.getElementById("add_team_name");
    let addTeamCountry = document.getElementById("add_team_country");
    let addCarModel = document.getElementById("add_car_model");

    // Get the values from the form fields
    let teamNameValue = addTeamName.value;
    let teamCountryValue = addTeamCountry.value;
    let carModelValue = addCarModel.value;


    // Put our data we want to send in a javascript object
    let data = {
        team_name: teamNameValue,
        team_country: teamCountryValue,
        car_model: carModelValue,
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_team", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            addTeamName.value = '';
            addTeamCountry.value = 'United States';
            addCarModel.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Teams
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("teams_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let teamNameCell = document.createElement("TD");
    let teamCountryCell = document.createElement("TD");
    let carModelCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.team_id;
    teamNameCell.innerText = newRow.team_name;
    teamCountryCell.innerText = newRow.team_country;
    carModelCell.innerText = newRow.car_model;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteTeam(newRow.team_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(teamNameCell);
    row.appendChild(teamCountryCell);
    row.appendChild(carModelCell);
    row.appendChild(deleteCell)

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.team_id);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("update_team_id");
    let option = document.createElement("option");
    option.text = newRow.team_name;
    option.value = newRow.team_id;
    selectMenu.add(option);
}