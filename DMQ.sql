-- CS340 Intro to Databases
-- Project Step 3 Draft
-- Group 11: Jason Gottlieb, Matthew French
-- Data Manipulation File

-------------------- Add a record --------------------

-- Add a new F1 Season
INSERT INTO `F1 Seasons` (`num_races`, `year`) 
VALUES (:num_races_input, :year_input);

-- Add a new F1 Grand Prix
INSERT INTO `Grand Prix` (`race_name`,`distance_per_lap`,`num_laps`,`has_sprint`, `F1 Seasons_season_id`)
VALUES (:race_name_input, :distance_per_lap_input, :num_laps_input, :has_sprint_input, :f1_seasons_season_id_dropdown_add);

-- Add a new Team
INSERT INTO `Teams` (`team_name`, `team_country`, `car_model`) 
VALUES(:team_name_input, :team_country_dropdown_input, :car_model_input);

--Add a new driver
INSERT INTO `Drivers` (`driver_name`, `driver_country`, `lifetime_points`, `lifetime_wins`, `lifetime_poles`, `Teams_team_id`)
VALUES(:driver_name_input, :driver_country__dropdown_add, :lifetime_points_input, :lifetime_wins_input, :lifetime_poles_input, :teams_team_id_dropdown_add);

-- Add a new Principal
INSERT INTO `Principals` (`principal_name`, `Teams_team_id`)
VALUES (:principal_name_input, :Teams_team_id_dropdown_add);

-- Associate a Team with a Grand Prix (M-M relationship addition)
INSERT INTO `Grand Prix_has_Teams` (`Grand Prix_race_id`, `Teams_team_id`)
VALUES(:race_id_dropdown_add, :Teams_team_id_dropdown_add)

-------------------- Update a record --------------------

-- Update a F1 Season
UPDATE `F1 Seasons` 
    SET num_races = :num_races_input, year = :year_input
    WHERE season_id = :season_id_dropdown_update;

-- Update F1 Grand Prix
UPDATE `Grand Prix`
    SET race_name = :race_name_input, distance_per_lap = :distance_per_lap_input, num_laps = :num_laps_input, has_sprint = :has_sprint_input, F1 Seasons_season_id = :f1_seasons_season_id_dropdown_input
    WHERE race_id = :race_id_dropdown_update;

-- Update a tean
UPDATE `Teams`
    SET team_name = :team_name_input, team_country = :team_country_dropdown_input, car_model = :car_model_input
    WHERE team_id = :team_id_dropdown_update;


-- Update a Driver
UPDATE `Drivers`
    SET driver_name = :driver_name_input, driver_country = :driver_country__dropdown_input, lifetime_points = :lifetime_points_input, lifetime_points = :lifetime_wins_input, lifetime_poles = :lifetime_poles_input
    WHERE driver_id = :driver_id_dropdown_update;

-- Update a principal
UPDATE `Principals`
    SET principal_name = :principal_name_input, Teams_team_id = :Teams_team_id_dropdown_input
    WHERE principal_id = :principal_id_dropdown_update;

-- Update a Teams in a Grand Prix (M-M Relationship update)
UPDATE `Grand Prix_has_Teams`
    SET `Grand Prix_race_id` = :race_id_dropdown_update, Teams_team_id = :Teams_team_id_dropdown_update
    WHERE`Grand Prix_race_id` = :race_id_dropdown_update  AND Teams_team_id = :team_id_dropdown_update;
    
-------------------- Delete a record --------------------

-- Delete a F1 Season
DELETE FROM `F1 Seasons` 
    WHERE season_id = :season_id_dropdown_delete;

-- Delete a Grand Prix
DELETE FROM `Grand Prix`
    WHERE race_id = :race_id_dropdown_delete;

-- Delete a team
DELETE FROM `TEAMS`
    WHERE team_id = :team_id_dropdown_delete;

-- Delete a driver
DELETE FROM `Drivers`
    WHERE driver_id = :driver_id_dropdown_delete;

-- Delete a princiapl 
DELETE FROM `Principals`
    WHERE principal_id = :principal_id_dropdown_delete;

-- Delete a Teams in Grand Prix (M-M Relationship delete)
DELETE FROM `Grand Prix_has_Teams`
    WHERE `Grand Prix_race_id` = :race_id_dropdown_delete  AND Teams_team_id = :team_id_dropdown_delete;



----------------Selects--------------------

-- Select for Grand Prix_has_Teams table, Associates race_id FK with race_name, team_id FK with team_name and shows year for race
SELECT `F1 Seasons`.year , `Grand Prix`.race_name, Teams.team_name
    FROM `Grand Prix_has_Teams`
    JOIN `Grand Prix` ON `Grand Prix_has_Teams`.`Grand Prix_race_id` = `Grand Prix`.race_id
    JOIN Teams ON `Grand Prix_has_Teams`.Teams_team_id = Teams.team_id
    JOIN `F1 Seasons` on `Grand Prix`.`F1 Seasons_season_id` = `F1 Seasons`.season_id;

-- Select F1 Season ID and Name dropdowns
SELECT `F1 Seasons`.season_id, `F1 Seasons`.year 
    FROM `F1 Seasons`;

SELECT `F1 Seasons`.season_id, `F1 Seasons`.year
    FROM `F1 Seasons`

-- Select Driver ID and name dropdowns
SELECT Drivers.driver_name, Drivers.driver_id
    FROM Drivers 

SELECT Drivers.driver_id
    FROM Drivers

-- Select Grand Prix race_id
SELECT `Grand Prix`.race_id
    FROM `Grand Prix`;

-- Teams ID and name drop down
SELECT Teams.team_id
    FROM Teams;

SELECT Teams.team_name, Teams.team_id
    FROM Teams;

-- Principals ID and name drop down
SELECT Principals.principal_id
    FROM Principals;

SELECT Principals.principal_name, Principals.principal_id
    FROM Principals;
