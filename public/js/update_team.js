// Get the objects we need to modify
let updateTeamForm = document.getElementById('update-team-form-ajax');

// Modify the objects we need
updateTeamForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTeamName = document.getElementById("update_team_name");
    let inputTeamCountry = document.getElementById("update_team_country");
    let inputTeamModel = document.getElementById("update_car_model");

    // Get the values from the form fields
    let teamNameValue = inputTeamName.value;
    let teamCountryValue = inputTeamCountry.value;
    let teamModelValue = inputTeamModel.value;
    


    // Put our data we want to send in a javascript object
    let data = {
        teamName: teamNameValue,
        teamCountry: teamCountryValue,
        teamModel: teamModelValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-team-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, teamNameValue);
            updateRow(xhttp.response, teamCountryValue);
            updateRow(xhttp.response, teamModelValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, team_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("teams_table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == team_id) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // // Get td of homeworld value
            // let td = updateRowIndex.getElementsByTagName("td")[3];

            let tdTeamName = updateRowIndex.getElementsByTagName("td")[1];
            tdTeamName.innerHTML = parsedData[0].team_name;

            let tdTeamCountry = updateRowIndex.getElementsByTagName("td")[2];
            tdTeamCountry.innerHTML = parsedData[0].team_country;

            let tdTeamModel = updateRowIndex.getElementsByTagName("td")[3];
            tdTeamModel.innerHTML = parsedData[0].team_model;

            // // Reassign homeworld to our value we updated to
            // td.innerHTML = parsedData[0].name; 
       }
    }
}