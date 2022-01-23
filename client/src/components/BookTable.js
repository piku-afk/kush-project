import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { TableMain } from './TableMain';

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Author</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export const BookTable = (props) => {
  const { books, setBookData, setBooks, editBook, openOrder } = props;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHeader />
        <TableMain
          books={books}
          setBooks={setBooks}
          editBook={editBook}
          openOrder={openOrder}
          setBookData={setBookData}
        />
      </Table>
    </TableContainer>
  );
};
