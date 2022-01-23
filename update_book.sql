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
END