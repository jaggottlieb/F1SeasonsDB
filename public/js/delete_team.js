// Citation for the following code:
// Date: 07/31/2023
// Copied From
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// code for deleteTeam function using jQuery
function deleteTeam(team_id) {
    let link = '/delete_team';
    let data = {
        team_id: team_id
    };


    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(team_id);
        }
    });
}

//  code for deleteTeam using regular javascript/xhttp
// function deleteTeam(team_id) {
//     // Put our data we want to send in a javascript object
//     let data = {
//         id: team_id
//     };

//     // Setup our AJAX request
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("DELETE", "/delete-person-ajax", true);
//     xhttp.setRequestHeader("Content-type", "application/json");

//     // Tell our AJAX request how to resolve
//     xhttp.onreadystatechange = () => {
//         if (xhttp.readyState == 4 && xhttp.status == 204) {

//             // Add the new data to the table
//             deleteRow(team_id);

//         }
//         else if (xhttp.readyState == 4 && xhttp.status != 204) {
//             console.log("There was an error with the input.")
//         }
//     }
//     // Send the request and wait for the response
//     xhttp.send(JSON.stringify(data));
// }


function deleteRow(team_id) {
    let table = document.getElementById("teams_table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == team_id) {
            table.deleteRow(i);
            deleteDropDownMenu(team_id);
            break;
        }
    }
}

function deleteDropDownMenu(team_id) {
    let selectMenu = document.getElementById("update_team_id");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(team_id)) {
            selectMenu[i].remove();
            break;
        }

    }
}
