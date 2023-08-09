let addTeamForm = document.getElementById('add_grand_prix_form');

// Modify the objects we need
addTeamForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let addRaceName = document.getElementById("add_race_name");
    let addDistancePerLap = document.getElementById("add_distance_per_lap");
    let addNumLaps = document.getElementById("add_num_laps");
    let addHasSprint = document.getElementById("add_has_sprint");
    let addF1SeasonsId = document.getElementById("add_F1_Seasons_season_id");

    // Get the values from the form fields
    let raceNameValue = addRaceName.value;
    let distancePerLapValue = addDistancePerLap.value;
    let numLapsValue = addNumLaps.value;
    let hasSprintValue = addHasSprint.value;
    let f1SeasonsIdValue = addF1SeasonsId.value;


    // Put our data we want to send in a javascript object
    let data = {
        race_name: raceNameValue,
        distance_per_lap: distancePerLapValue,
        num_laps: numLapsValue,
        has_sprint: hasSprintValue,
        F1_Seasons_season_id: f1SeasonsIdValue
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_grand_prix", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            addRaceName.value = '';
            addDistancePerLap.value = '';
            addNumLaps.value = '';
            addHasSprint.value = '';
            addF1SeasonsId.value = '';

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
    let currentTable = document.getElementById("grand_prix_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let raceNameCell = document.createElement("TD");
    let distanePerLapCell = document.createElement("TD");
    let numLapsCell = document.createElement("TD");
    let hasSprintCell = document.createElement("TD");
    let f1SeasonsIdCell = document.createElement("TD");

    // let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.race_id;
    raceNameCell.innerText = newRow.race_name;
    distanePerLapCell.innerText = newRow.distance_per_lap;
    numLapsCell.innerText = newRow.num_laps;
    hasSprintCell.innerText = newRow.has_sprint;
    f1SeasonsIdCell.innerText = newRow.F1_Seasons_season_id;

    // deleteCell = document.createElement("button");
    // deleteCell.innerHTML = "Delete";
    // deleteCell.onclick = function () {
    //     deleteTeam(newRow.team_id);
    // };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(raceNameCell);
    row.appendChild(distanePerLapCell);
    row.appendChild(numLapsCell);
    row.appendChild(hasSprintCell);
    row.appendChild(f1SeasonsIdCell);
    // row.appendChild(deleteCell)

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.race_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // let selectMenu = document.getElementById("update_team_id");
    let option = document.createElement("option");
    option.text = newRow.race_name;
    option.value = newRow.race_id;
    // selectMenu.add(option);
}