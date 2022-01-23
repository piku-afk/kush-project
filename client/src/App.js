import { Container, Grid } from '@mui/material';
import { useState } from 'react';
import { BookEditDialog } from './components/BookEditDialog';
import { BookTable } from './components/BookTable';
import { CustomerDialog } from './components/CustomerDialog';
import { Header } from './components/Header';
import { OrderTable } from './components/OrderTable';
import { SearchBar } from './components/SearchBar';
import './index.css';

export const App = () => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [bookData, setBookData] = useState({});
  const [showOrders, setShowOrder] = useState(false);

  const editBook = (book) => {
    setBookData(book);
    setShowEditDialog(true);
  };
  const openOrder = (book) => {
    setBookData(book);
    setShowCustomerDialog(true);
  };

  const [books, setBooks] = useState([]);

  return (
    <>
      <Header
        editBook={editBook}
        showOrders={showOrders}
        showBooks={() => setShowOrder(false)}
        nowShowOrders={() => setShowOrder(true)}
      />
      <Container sx={{ paddingY: 4 }}>
        <Grid container spacing={6}>
          {showOrders ? (
            <Grid item xs={12}>
              <OrderTable />
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <SearchBar setBooks={setBooks} />
              </Grid>
              <Grid item xs={12}>
                <BookTable
                  books={books}
                  setBooks={setBooks}
                  editBook={editBook}
                  openOrder={openOrder}
                  setBookData={setBookData}
                />
              </Grid>
            </>
          )}
          <BookEditDialog
            bookData={bookData}
            show={showEditDialog}
            close={() => setShowEditDialog(false)}
          />
          <CustomerDialog
            bookData={bookData}
            show={showCustomerDialog}
            close={() => setShowCustomerDialog(false)}
          />
        </Grid>
      </Container>
    </>
  );
};
