import { Button } from '@mui/material';
import { withStyles } from '@mui/styles';

export const BaseButton = withStyles({
  root: {
    textTransform: 'capitalize',
    borderRadius: '8px',
    // backgroundColor: 'red',
  },
})(Button);
