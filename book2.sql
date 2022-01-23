-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bookdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bookdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookdb` DEFAULT CHARACTER SET utf8 ;
USE `bookdb` ;

-- -----------------------------------------------------
-- Table `bookdb`.`book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookdb`.`book` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `author` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `quantity` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookdb`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookdb`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `phone` VARCHAR(10) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookdb`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookdb`.`order` (
  `customer_id` INT NULL,
  `book_id` INT NULL,
  `id` VARCHAR(45) NOT NULL,
  `quantity` INT NULL,
  INDEX `fk_customer_has_book_book1_idx` (`book_id` ASC) VISIBLE,
  INDEX `fk_customer_has_book_customer_idx` (`customer_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_customer_has_book_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `bookdb`.`customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_has_book_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `bookdb`.`book` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
