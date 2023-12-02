import React, { useState } from 'react';
import {
  UpdateSignatureConfirmation,
  UpdateSignatureProps,
} from '../types';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';

const UpdateSignatureConfirmationComponent: UpdateSignatureConfirmation = ({
  userOp,
  context,
  onComplete,
  updateSignature,
}: UpdateSignatureProps) => {
  const [open, setOpen] = useState(true);
  const [signature, setSignature] = useState('');

  const handleComplete = () => {
    onComplete(context);
    updateSignature(signature);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <TextField
          label="Enter Signature"
          variant="outlined"
          fullWidth
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleComplete} disabled={!signature}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateSignatureConfirmationComponent;
