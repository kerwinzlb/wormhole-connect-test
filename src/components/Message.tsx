import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
interface PropsType {
  content: string;
  duration: number;
  type: AlertColor;
}
type AlertColor = 'success' | 'info' | 'warning' | 'error';

const Message = (props: PropsType) => {
  const { content, duration, type } = { ...props };
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert severity={type} variant="standard">
        {content}
      </Alert>
    </Snackbar>
  );
};

export default Message;
