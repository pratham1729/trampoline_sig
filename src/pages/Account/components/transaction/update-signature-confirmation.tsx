import React, { useState } from 'react';
import {
  UpdateSignature,
  UpdateSignatureProps,
} from '../types';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';

const UpdateSignatureComponent: UpdateSignature = ({
  userOp,
  context,
  onComplete,
  onSignatureUpdate,
  transaction,
  onReject,
}: UpdateSignatureProps) => {
  const [open, setOpen] = useState(true);
  const [signature, setSignature] = useState('');

  const handleComplete = () => {
    onComplete(context);
    const updatedUserOp = { ...userOp, signature };
    updatedUserOp.signature = signature;
    onSignatureUpdate(updatedUserOp);
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

export default UpdateSignatureComponent;
