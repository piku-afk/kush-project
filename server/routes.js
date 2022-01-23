const express = require('express');
const connection = require('./mysqlConfig');
const router = express.Router();

// displaying all books
router.get('/', (req, res) => {
  const { query = null } = req.query;
  let sqlQuery = 'select * from book order by id desc';

  if (query) {
    sqlQuery = `select * from book where name regexp '${query}' or author regexp '${query}';`;
  }

  connection.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.log(error);
      return;
    }
    res.send(results);
  });
});

// displaying all orders
router.get('/orders', (req, res) => {
  const query =
    'SELECT order_id, date, name, first_name, last_name, phone, `order`.quantity FROM bookdb2.order LEFT JOIN customer ON `order`.customer_id = customer.id LEFT JOIN book ON `order`.book_id = book.id order by `order`.order_id desc';

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      return;
    }
    res.send(results);
  });
});

// for adding new books
router.post('/add', (req, res) => {
  const { name, author, description, quantity } = req.body || {};
  const query = `call add_new_book('${name}', '${author}', '${description}', '${quantity}');`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.send({ error: { message: 'something went wrong.' } });
    }
    res.send({ name, author, description, quantity });
  });
});

// for updating an already present book
router.patch('/:bookID', (req, res) => {
  const { bookID } = req.params;
  const { name, author, description, quantity } = req.body || {};
  console.log(req.body);
  const query = `call update_book( ${bookID},'${name}', '${author}', '${description}', '${quantity}');`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.send({ error: { message: 'something went wrong.' } });
    }
    res.send({ name, author, description, quantity });
  });
});

// deleting a book by bookID
router.delete('/:bookID', (req, res) => {
  const { bookID } = req.params;
  const query = `call delete_book(${bookID});`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.send({
        error: {
          message: 'something went wrong',
        },
      });
    }
    res.send({ success: { message: 'Book delete successfully' } });
  });
});

// for adding new orders
router.post('/order/:bookID', (req, res) => {
  const { bookID } = req.params;
  const { firstName, lastName, phone, quantity } = req.body || {};
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const id = Math.floor(Math.random() * (1000 - 1) + 1);
  console.log({ ...req.body, date, id });

  const query = `call add_new_order(${id}, '${firstName}','${lastName}', '${phone.substring(
    0,
    10
  )}', ${+quantity}, ${+bookID}, '${date}');`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.send({ error: { message: 'something went wrong.' } });
    }
    res.send({ bookID, firstName, lastName, phone, quantity });
  });
});

module.exports = router;
