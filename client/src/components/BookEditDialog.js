import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { BaseButton } from './componentStyles';
import axios from 'axios';

const defaultFormData = {
  name: '',
  author: '',
  quantity: NaN,
  description: '',
};

export const BookEditDialog = (props) => {
  const { bookData, show, close } = props;
  const [formData, setFormData] = useState(defaultFormData);
  const changeFormData = (data) =>
    setFormData((prev) => ({ ...prev, ...data }));

  const handleClose = () => {
    setFormData(defaultFormData);
    close();
  };

  useEffect(() => {
    const isValidBookData =
      typeof bookData === 'object' && Object.keys(bookData).length > 0;
    if (isValidBookData) {
      setFormData(bookData);
    }
  }, [bookData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id: bookID } = formData;

    console.log(formData);

    if (bookID) {
      await axios({
        url: `http://localhost:3001/book/${bookID}`,
        data: formData,
        method: 'PATCH',
      });
    } else {
      await axios({
        url: 'http://localhost:3001/book/add',
        data: formData,
        method: 'POST',
      });
    }
    window.location.reload();
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      component='form'
      onSubmit={handleSubmit}>
      <DialogTitle>{formData.id ? 'Edit' : 'Add New'} Book</DialogTitle>
      <DialogContent style={{ paddingTop: 8 }}>
        <Grid container spacing={4}>
          <Grid item sm={12}>
            <TextField
              required
              fullWidth
              label='Name'
              value={formData.name}
              onChange={(e) => changeFormData({ name: e.target.value })}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              required
              multiline
              minRows={4}
              maxRows={6}
              fullWidth
              label='Description'
              value={formData.description}
              onChange={(e) => changeFormData({ description: e.target.value })}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              required
              fullWidth
              label='Author'
              value={formData.author}
              onChange={(e) => changeFormData({ author: e.target.value })}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              required
              fullWidth
              type='number'
              label='Quantity'
              value={formData.quantity}
              onChange={(e) => changeFormData({ quantity: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <BaseButton type='button' onClick={handleClose}>
          Cancel
        </BaseButton>
        <BaseButton type='submit'>Save</BaseButton>
      </DialogActions>
    </Dialog>
  );
};
