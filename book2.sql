-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bookdb2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bookdb2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookdb2` DEFAULT CHARACTER SET utf8 ;
USE `bookdb2` ;

-- -----------------------------------------------------
-- Table `bookdb2`.`book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookdb2`.`book` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `author` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bookdb2`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookdb2`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL DEFAULT NULL,
  `last_name` VARCHAR(45) NULL DEFAULT NULL,
  `phone` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bookdb2`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookdb2`.`order` (
  `customer_id` INT NULL DEFAULT NULL,
  `book_id` INT NULL DEFAULT NULL,
  `order_id` VARCHAR(45) NOT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_customer_has_book_book1_idx` (`book_id` ASC) VISIBLE,
  INDEX `fk_customer_has_book_customer_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_customer_has_book_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `bookdb2`.`book` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_customer_has_book_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `bookdb2`.`customer` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `bookdb2` ;

-- -----------------------------------------------------
-- procedure add_new_book
-- -----------------------------------------------------

DELIMITER $$
USE `bookdb2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_new_book`(
	bName varchar(45),
    bAuthor varchar(45),
    bDescription varchar(45),
    bQuantity int
)
BEGIN
	start transaction;
	insert into book(name, author, description, quantity)
	values (bName, bAuthor, bDescription, bQuantity);
    commit;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_new_order
-- -----------------------------------------------------

DELIMITER $$
USE `bookdb2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_new_order`(
	id int,
	cFirst varchar(45),
    cLast varchar(45),
    cPhone varchar(10),
    quant int,
    bookID int,
    inputDate datetime
)
BEGIN
	declare cus_id int;
    
	start transaction;
    insert into customer(first_name, last_name, phone)
    values(cFirst, cLast, cPhone);
	set cus_id = last_insert_id();
    
	insert into `order`(order_id, customer_id, book_id, quantity, `date`)
    values(id, cus_id, bookID, quant, inputDate);
    
    update book
    set quantity=quantity - quant
    where book.id = bookID;
    commit;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_book
-- -----------------------------------------------------

DELIMITER $$
USE `bookdb2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_book`(bookID INT)
BEGIN	
	delete from book where id = bookID;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_book
-- -----------------------------------------------------

DELIMITER $$
USE `bookdb2`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_book`(
	bookid int,
	bName varchar(45),
    bAuthor varchar(45),
    bDescription varchar(45),
    bQuantity int
)
BEGIN
	update book
	set name=bName, author=bAuthor, description=bDescription, quantity=bQuantity
    where id=bookid;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
