import React, { useState } from 'react';
import { ethers } from 'ethers';
import {
  HashGenerationConfirmation,
  HashGenerationProps,
} from '../types';
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { UserOperationStruct } from '@account-abstraction/contracts';

const generateHash = (UserOPstruct: UserOperationStruct) => {
    const {signature, ...rest } = UserOPstruct;
    const structString=JSON.stringify(rest);
    const Hexstr= ethers.utils.hexlify(ethers.utils.toUtf8Bytes("\x19Ethereum Signed Message:\n"+structString.length/2+structString));
    return ethers.utils.keccak256(Hexstr);
}
const HashGenerationConfirmationComponent: HashGenerationConfirmation = ({
  userOp,
  context,
  onComplete,
}: HashGenerationProps) => {
  const [open, setOpen] = useState(true);

  const handleComplete = () => {
    onComplete(context);
    setOpen(false);
  };
  const hashvalue = generateHash(userOp);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        {hashvalue}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleComplete}>
          Next
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default HashGenerationConfirmationComponent;
