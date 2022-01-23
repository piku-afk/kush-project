import {
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { BaseButton } from './componentStyles';

const defaultFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  quantity: NaN,
};

export const CustomerDialog = (props) => {
  const { show, close, bookData } = props;
  const [formData, setFormData] = useState(defaultFormData);
  const changeFormData = (data) =>
    setFormData((prev) => ({ ...prev, ...data }));

  const { id, name, author, description, quantity } = bookData || {};

  const handleClose = () => {
    setFormData(defaultFormData);
    close();
  };

  const handleSubmit = async () => {
    await axios({
      url: `http://localhost:3001/book/order/${id}`,
      data: formData,
      method: 'POST',
    });

    handleClose();
    window.location.reload();
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Place Order</DialogTitle>
      <DialogContent style={{ paddingTop: 8 }}>
        <Grid container spacing={4}>
          <Grid item sm={12}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h6' color='InfoText'>
                  Book Details
                </Typography>
                <Typography variant='subtitle2'>Name: {name}</Typography>
                <Typography variant='subtitle2'>
                  Description: {description}
                </Typography>
                <Typography variant='subtitle2'>Author: {author}</Typography>
                <Typography variant='subtitle2'>
                  Quantity: {quantity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label='First Name'
              value={formData.firstName}
              onChange={(e) => changeFormData({ firstName: e.target.value })}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label='Last Name'
              value={formData.lastName}
              onChange={(e) => changeFormData({ lastName: e.target.value })}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              type='number'
              fullWidth
              label='Phone Number'
              value={formData.phone}
              onChange={(e) => changeFormData({ phone: e.target.value })}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              type='number'
              fullWidth
              label='Quantity'
              value={formData.quantity}
              onChange={(e) => changeFormData({ quantity: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <BaseButton onClick={handleClose}>Close</BaseButton>
        <BaseButton onClick={handleSubmit}>Save</BaseButton>
      </DialogActions>
    </Dialog>
  );
};
