import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';

export const SearchBar = (props) => {
  const { setBooks } = props;
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/book?query=${query}`);
      const data = await res.json();
      setBooks(data);
    })();
  }, [query, setBooks]);

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment sx={{ marginRight: 1 }}>
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            sx={{
              marginLeft: 1,
              cursor: 'pointer',
            }}
            onClick={() => setQuery('')}>
            <CancelIcon />
          </InputAdornment>
        ),
      }}
      variant='outlined'
      fullWidth
      placeholder='Search using book name or author'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
