// Get the objects we need to modify
let addTeamForm = document.getElementById('add_season_form');

// Modify the objects we need
addTeamForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let addNumRaces = document.getElementById("add_num_races");
    let addYear = document.getElementById("add_year");


    // Get the values from the form fields
    let numRacesValue = addNumRaces.value;
    let yearValue = addYear.value;


    // Put our data we want to send in a javascript object
    let data = {
        num_races: numRacesValue,
        year: yearValue,
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_season", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            addNumRaces.value = '';
            addYear.value = '';
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
    let currentTable = document.getElementById("seasons_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let numRacesCell = document.createElement("TD");
    let yearCell = document.createElement("TD");

    // let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.season_id;
    numRacesCell.innerText = newRow.num_races;
    yearCell.innerText = newRow.year;


    // deleteCell = document.createElement("button");
    // deleteCell.innerHTML = "Delete";
    // deleteCell.onclick = function () {
    //     deleteTeam(newRow.team_id);
    // };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(numRacesCell);
    row.appendChild(yearCell);
    // row.appendChild(deleteCell)

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.season_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // let selectMenu = document.getElementById("update_team_id");
    let option = document.createElement("option");
    option.text = newRow.season_id;
    option.value = newRow.season_id;
    selectMenu.add(option);
}