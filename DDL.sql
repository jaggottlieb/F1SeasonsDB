-- DDL.SQL Project Step 2 Draft
-- Matthew French
-- Jason Gottlieb

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cs340_gottlija
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cs340_gottlija
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `cs340_gottlija` DEFAULT CHARACTER SET utf8 ;
USE `cs340_gottlija` ;

-- -----------------------------------------------------
-- Table `cs340_gottlija`.`F1 Seasons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gottlija`.`F1 Seasons` (
  `season_id` INT NOT NULL AUTO_INCREMENT,
  `num_races` INT NOT NULL,
  `year` INT NOT NULL,
  PRIMARY KEY (`season_id`),
  UNIQUE INDEX `season_id_UNIQUE` (`season_id` ASC),
  UNIQUE INDEX `year_UNIQUE` (`year` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_gottlija`.`Grand Prix`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gottlija`.`Grand Prix` (
  `race_id` INT NOT NULL AUTO_INCREMENT,
  `race_name` VARCHAR(255) NOT NULL,
  `distance_per_lap` DECIMAL(18) NOT NULL,
  `num_laps` INT NOT NULL,
  `has_sprint` TINYINT NOT NULL DEFAULT 0,
  `F1 Seasons_season_id` INT NOT NULL,
  PRIMARY KEY (`race_id`, `F1 Seasons_season_id`),
  UNIQUE INDEX `race_id_UNIQUE` (`race_id` ASC),
  INDEX `fk_Grand Prix_F1 Seasons1_idx` (`F1 Seasons_season_id` ASC),
  CONSTRAINT `fk_Grand Prix_F1 Seasons1`
    FOREIGN KEY (`F1 Seasons_season_id`)
    REFERENCES `cs340_gottlija`.`F1 Seasons` (`season_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_gottlija`.`Teams`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gottlija`.`Teams` (
  `team_id` INT NOT NULL AUTO_INCREMENT,
  `team_name` VARCHAR(255) NOT NULL,
  `team_country` VARCHAR(45) NOT NULL,
  `car_model` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`team_id`),
  UNIQUE INDEX `team_id_UNIQUE` (`team_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_gottlija`.`Drivers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gottlija`.`Drivers` (
  `driver_id` INT NOT NULL AUTO_INCREMENT,
  `driver_name` VARCHAR(255) NOT NULL,
  `driver_country` VARCHAR(45) NOT NULL,
  `lifetime_points` DECIMAL(18) NOT NULL,
  `lifetime_wins` INT NOT NULL,
  `lifetime_poles` INT NOT NULL,
  `Teams_team_id` INT NOT NULL,
  PRIMARY KEY (`driver_id`, `Teams_team_id`),
  UNIQUE INDEX `driver_id_UNIQUE` (`driver_id` ASC),
  INDEX `fk_Drivers_Teams1_idx` (`Teams_team_id` ASC),
  CONSTRAINT `fk_Drivers_Teams1`
    FOREIGN KEY (`Teams_team_id`)
    REFERENCES `cs340_gottlija`.`Teams` (`team_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_gottlija`.`Principals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gottlija`.`Principals` (
  `principal_id` INT NOT NULL AUTO_INCREMENT,
  `principal_name` VARCHAR(45) NOT NULL,
  `Teams_team_id` INT NOT NULL,
  PRIMARY KEY (`principal_id`, `Teams_team_id`),
  UNIQUE INDEX `principal_id_UNIQUE` (`principal_id` ASC),
  INDEX `fk_Principals_Teams_idx` (`Teams_team_id` ASC),
  CONSTRAINT `fk_Principals_Teams`
    FOREIGN KEY (`Teams_team_id`)
    REFERENCES `cs340_gottlija`.`Teams` (`team_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_gottlija`.`Grand Prix_has_Teams`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_gottlija`.`Grand Prix_has_Teams` (
  `Grand Prix_race_id` INT NOT NULL,
  `Teams_team_id` INT NOT NULL,
  PRIMARY KEY (`Grand Prix_race_id`, `Teams_team_id`),
  INDEX `fk_Grand Prix_has_Teams_Teams1_idx` (`Teams_team_id` ASC),
  INDEX `fk_Grand Prix_has_Teams_Grand Prix1_idx` (`Grand Prix_race_id` ASC),
  CONSTRAINT `fk_Grand Prix_has_Teams_Grand Prix1`
    FOREIGN KEY (`Grand Prix_race_id`)
    REFERENCES `cs340_gottlija`.`Grand Prix` (`race_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Grand Prix_has_Teams_Teams1`
    FOREIGN KEY (`Teams_team_id`)
    REFERENCES `cs340_gottlija`.`Teams` (`team_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



INSERT INTO `F1 Seasons` (`season_id`, `num_races`, `year`) VALUES
(1, 21, 2019),
(2, 17, 2020),
(3, 22, 2021),
(4, 22, 2022),
(5, 22, 2023);

INSERT INTO `Grand Prix` (`race_id`, `race_name`, `distance_per_lap`, `num_laps`, `has_sprint`, `F1 Seasons_season_id`) VALUES
(1, 'Bahrain Grand Prix', 5.142, 57, 0, 4),
(2, 'Saudi Arabian Grand Prix', 6.174, 50, 0, 4),
(3, 'Australian Grand Prix', 5.412, 58, 0, 4),
(4, 'Bahrain Grand Prix', 5.412, 57, 0, 5),
(5, 'Azerbaijan Grand Prix', 6.003, 51, 1, 5);

INSERT INTO `Teams` (`team_id`, `team_name`, `team_country`, `car_model`) VALUES 
(1, 'Oracle Red Bull Racing', 'Austria', 'RB19'),
(2, 'Mercedes-AMG Petronas F1 Team', 'Germany', 'W14'),
(3, 'Scuderia Ferrari', 'Italy', 'SF-23'),
(4, 'Williams Racing', 'United Kingdom', 'FW45'),
(5, 'BWT Alpine F1 Team', 'France', 'A523');

INSERT INTO `Drivers` (`driver_id`, `driver_name`, `driver_country`, `lifetime_points`, `lifetime_wins`, `lifetime_poles`, `Teams_team_id`) VALUES 
(1, 'Max Verstappen', 'Netherlands', 2266.5, 43, 27, 1),
(2, 'Lewis Hamilton', 'United Kingdom', 4526.5, 103, 103, 2),
(3, 'Charles Leclerc', 'Monaco', 940, 5, 19, 3),
(4, 'Esteban Ocon', 'France', 395, 1, 0, 5),
(5, 'Alex Albon', 'Thailand', 212, 0, 0, 4);

INSERT INTO `Principals` (`principal_id`, `principal_name`, `Teams_team_id`) VALUES 
(1, 'Christian Homer', 1),
(2, 'Toto Wolff', 2),
(3, 'Frederic Vasseur', 3),
(4, 'Otmar Szafnauer', 4),
(5, 'James Vowels', 5);

INSERT INTO `Grand Prix_has_Teams` (`Grand Prix_race_id`, `Teams_team_id`) VALUES 
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2);

