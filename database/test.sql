SELECT F1_Seasons.year, Grand_Prix.race_name, Grand_Prix.race_id, Grand_Prix.F1_Seasons_season_id
    FROM Grand_Prix
    JOIN F1_Seasons ON Grand_Prix.F1_Seasons_season_id = F1_Seasons.season_id;