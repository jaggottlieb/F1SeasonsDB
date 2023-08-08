// Citation for the following code:
// Date: 07/31/2023
// Copied From
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addTeamForm = document.getElementById('add_principal_form');

// Modify the objects we need
addTeamForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let addPrincipalName = document.getElementById("add_principal_name");
    let addTeamId = document.getElementById("add_Teams_team_id");

    // Get the values from the form fields
    let principalNameValue = addPrincipalName.value;
    let teamIdValue = addTeamId.value;


    // Put our data we want to send in a javascript object
    let data = {
        principal_name: principalNameValue,
        Teams_team_id: teamIdValue,
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add_principal", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            addPrincipalName.value = '';
            addTeamId.value = '';
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
    let currentTable = document.getElementById("principals_table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let princiaplNameCell = document.createElement("TD");
    let teamIdCell = document.createElement("TD");

    // let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.principal_id;
    princiaplNameCell.innerText = newRow.principal_name;
    teamIdCell.innerText = newRow.Teams_team_id;


    // deleteCell = document.createElement("button");
    // deleteCell.innerHTML = "Delete";
    // deleteCell.onclick = function () {
    //     deletePrincipal(newRow.principal_id);
    // };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(princiaplNameCell);
    row.appendChild(teamIdCell);
    // row.appendChild(deleteCell)

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.principal_id);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("update_principal_id");
    let option = document.createElement("option");
    option.text = newRow.principal_id;
    option.value = newRow.principal_id;
    selectMenu.add(option);
}