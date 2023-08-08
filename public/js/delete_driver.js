// Citation for the following code:
// Date: 08/08/2023
// Copied From
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// code for deleteDriver function using jQuery
function deleteDriver(driver_id) {
    let link = '/delete_driver';
    let data = {
        driver_id: driver_id
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(driver_id);
        }
    });
}



function deleteRow(driver_id) {

    let table = document.getElementById("drivers_table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data_value") == driver_id) {
            table.deleteRow(i);
            deleteDropDownMenu(driver_id);
            break;
        }
    }
}

function deleteDropDownMenu(driver_id) {
    let selectMenu = document.getElementById("update_driver_id");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(driver_id)) {
            selectMenu[i].remove();
            break;
        }

    }
}