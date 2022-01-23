import { AppBar, Toolbar, Typography } from '@mui/material';
import { BaseButton } from './componentStyles';

export const Header = (props) => {
  const { editBook, showBooks, showOrders, nowShowOrders } = props;

  return (
    <AppBar color='secondary' position='static'>
      <Toolbar>
        <Typography variant='h6'>Book Store</Typography>
        <BaseButton
          variant='contained'
          sx={{ marginLeft: 'auto', fontWeight: 600 }}
          onClick={() => editBook({})}>
          Add Book
        </BaseButton>
        <BaseButton
          variant='contained'
          sx={{ marginLeft: 2, fontWeight: 600 }}
          onClick={() => {
            if (showOrders) {
              return showBooks();
            }
            return nowShowOrders();
          }}>
          View All {showOrders ? 'Books' : 'Orders'}
        </BaseButton>
      </Toolbar>
    </AppBar>
  );
};
