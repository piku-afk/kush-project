import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

export const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/book/orders/');
      const data = await res.json();
      setOrders(data);
    })();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Book</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            const {
              order_id,
              name,
              first_name,
              last_name,
              phone,
              date,
              quantity,
            } = order;

            const options = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
            const orderDate = new Date(date);

            return (
              <TableRow>
                <TableCell>{order_id}</TableCell>
                <TableCell>
                  {orderDate.toLocaleDateString('en-US', options)}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                  {first_name} {last_name}
                </TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
