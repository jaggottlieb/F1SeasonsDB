// Citation for the following code:
// Date: 08/08/2023
// Copied From
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addDriverForm = document.getElementById('add_driver_form');

// Modify the objects we need
addDriverForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let addDriverName = document.getElementById("add_driver_name");
    let addDriverCountry = document.getElementById("add_driver_country");
    let addLifetimePoints = document.getElementById("add_lifetime_points");
    let addLifetimeWins = document.getElementById("add_lifetime_wins");
    let addLifetimePoles = document.getElementById("add_lifetime_poles");
    let addDriverTeam = document.getElementById("add_Teams_team_id");

    // Get the values from the form fields
    let driverNameValue = addDriverName.value;
    let driverCountryValue = addDriverCountry.value;
    let lifetimePointsValue = addLifetimePoints.value;
    let lifetimeWinsValue = addLifetimeWins.value;
    let lifetimePolesValue = addLifetimePoles.value;
    let teamValue = addDriverTeam.value;

    // Put our data we want to send in a javascript object
    let data = {
        driver_name: driverNameValue,
        driver_country: driverCountryValue,
        lifetime_points: lifetimePointsValue,
        lifetime_wins: lifetimeWinsValue,
        lifetime_poles: lifetimePolesValue,
        Teams_team_id: teamValue
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_driver", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            addDriverName.value = '';
            addDriverCountry.value = 'United States';
            addLifetimePoints.value = '';
            addLifetimeWins.value = '';
            addLifetimePoints.value = '';
            addLifetimePoles.value = '';
            addDriverTeam.value = 'Select a Team';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Drivers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("drivers_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let driverNameCell = document.createElement("TD");
    let driverCountryCell = document.createElement("TD");
    let lifetimePointsCell = document.createElement("TD");
    let lifetimeWinsCell = document.createElement("TD");
    let lifetimePolesCell = document.createElement("TD");
    let driverTeamCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.driver_id;
    driverNameCell.innerText = newRow.driver_name;
    driverCountryCell.innerText = newRow.driver_country;
    lifetimePointsCell.innerText = newRow.lifetime_points;
    lifetimeWinsCell.innerText = newRow.lifetime_wins;
    lifetimePolesCell.innerText = newRow.lifetime_poles;
    driverTeamCell.innerText = newRow.Teams_team_id;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteDriver(newRow.driver_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(driverNameCell);
    row.appendChild(driverCountryCell);
    row.appendChild(lifetimePointsCell);
    row.appendChild(lifetimeWinsCell);
    row.appendChild(lifetimePolesCell);
    row.appendChild(driverTeamCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data_value', newRow.driver_id);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("update_driver_id");
    let option = document.createElement("option");
    option.text = newRow.driver_id;
    option.value = newRow.driver_name;
    selectMenu.add(option);
}