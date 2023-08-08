// Citation for the following code:
// Date: 08/08/2023
// Copied From
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let updateDriverForm = document.getElementById('update_driver_form');

// Modify the objects we need
updateDriverForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let updateDriverID = document.getElementById("update_driver_id");
    let updateDriverName = document.getElementById("update_driver_name");
    let updateDriverCountry = document.getElementById("update_driver_country");
    let updateLifetimePoints = document.getElementById("update_lifetime_points");
    let updateLifetimeWins = document.getElementById("update_lifetime_wins");
    let updateLifetimePoles = document.getElementById("update_lifetime_poles");
    let updateDriverTeam = document.getElementById("update_Teams_team_id");

    // Get the values from the form fields
    let driverIDValue = updateDriverID.value;
    let driverNameValue = updateDriverName.value;
    let driverCountryValue = updateDriverCountry.value;
    let lifetimePointsValue = updateLifetimePoints.value;
    let lifetimeWinsValue = updateLifetimeWins.value;
    let lifetimePolesValue = updateLifetimePoles.value;
    let driverTeamValue = updateDriverTeam.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(driverIDValue)) {
        return;
    }



    // Put our data we want to send in a javascript object
    let data = {
        driver_id: driverIDValue,
        driver_name: driverNameValue,
        driver_country: driverCountryValue,
        lifetime_points: lifetimePointsValue,
        lifetime_wins: lifetimeWinsValue,
        lifetime_poles: lifetimePolesValue,
        Teams_team_id: driverTeamValue
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update_driver", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, driverIDValue, data);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, driver_id, object) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("drivers_table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data_value") == driver_id) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of driver_name value
            let tdDriverName = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign driver_name to our value we updated to
            tdDriverName.innerHTML = object.driver_name;

            // Get td of driver_country value
            let tdDriverCountry = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign driver_country to our value we updated to
            tdDriverCountry.innerHTML = object.driver_country;

            // Get td of lifetime_points value
            let tdLifetimePoints = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign lifetime_points to our value we updated to
            tdLifetimePoints.innerHTML = object.lifetime_points;

            // Get td of lifetime_wins value
            let tdLifetimeWins = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign lifetime_wins to our value we updated to
            tdLifetimeWins.innerHTML = object.lifetime_wins;

            // Get td of lifetime_poles value
            let tdLifetimePoles = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign lifetime_poles to our value we updated to
            tdLifetimePoles.innerHTML = object.lifetime_poles;

            // Get td of Teams_team_id value
            let tdDriverTeam = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign Teams_team_id to our value we updated to
            tdDriverTeam.innerHTML = object.Teams_team_id;
        }
    }
}