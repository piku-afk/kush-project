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
END