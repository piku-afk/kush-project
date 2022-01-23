CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_book`(bookID INT)
BEGIN	
	delete from book where id = bookID;
END