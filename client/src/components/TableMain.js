import { IconButton, TableBody, TableCell, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BaseButton } from './componentStyles';

const Row = (props) => {
  const { book, setBooks, editBook, openOrder } = props;

  const { id, name, author, quantity } = book;

  const deleteBook = async () => {
    const res = await fetch(`http://localhost:3001/book/${id}`, {
      method: 'DELETE',
    });
    const { success, error } = (await res.json()) || {};
    const { message: successMessage } = success || {};
    const { message: errorMessage } = error || {};
    if (successMessage) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  return (
    <TableBody>
      <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{author}</TableCell>
        <TableCell>{quantity}</TableCell>
        <TableCell align='right'>
          <IconButton color='info' size='small' onClick={() => editBook(book)}>
            <EditIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            color='error'
            size='small'
            sx={{ marginLeft: 1 }}
            onClick={deleteBook}>
            <DeleteIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </TableCell>
        <TableCell align='right'>
          <BaseButton
            variant='outlined'
            onClick={() => {
              openOrder(book);
            }}>
            Place Order
          </BaseButton>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export const TableMain = (props) => {
  const { books, setBooks, editBook, openOrder } = props;

  return books.map((book) => (
    <Row
      key={book.id}
      book={book}
      setBooks={setBooks}
      editBook={editBook}
      openOrder={openOrder}
    />
  ));
};
