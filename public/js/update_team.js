// Get the objects we need to modify
let updatePersonForm = document.getElementById('update_team_form');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let updateTeamID = document.getElementById("update_team_id");
    let updateTeamName = document.getElementById("update_team_name");
    let updateTeamCountry = document.getElementById("update_team_country");
    let updateCarModel = document.getElementById("update_car_model");

    // Get the values from the form fields
    let teamIDValue = updateTeamID.value;
    let teamNameValue = updateTeamName.value;
    let teamCountryValue = updateTeamCountry.value;
    let carModelValue = updateCarModel.value;

    if (isNaN(teamIDValue)) {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        team_id: teamIDValue,
        team_name: teamNameValue,
        team_country: teamCountryValue,
        car_model: carModelValue,
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update_team", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, teamIDValue, data);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, team_id, object) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("teams_table");

    console.log(parsedData)
    console.log(data.team_name)

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == team_id) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdTeamName = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign homeworld to our value we updated to
            tdTeamName.innerHTML = object.team_name;

            // Get td of homeworld value
            let tdTeamCountry = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign homeworld to our value we updated to
            tdTeamCountry.innerHTML = object.team_country;

            // Get td of homeworld value
            let tdCarModel = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            tdCarModel.innerHTML = object.car_model;
        }
    }
}


