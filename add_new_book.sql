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
END