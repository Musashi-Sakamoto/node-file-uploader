import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = ({
  onSubmit, isOpen, onClose, deletedPost
}) => {
  const [title, setTitle] = useState('');
  const onSubmitClicked = () => {
    onSubmit();
    setTitle('');
  };

  useEffect(() => {
    setTitle(deletedPost ? deletedPost.title : '');
  }, [deletedPost]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you really want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete this post {title}, you can not undo this operation. Is that okay?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitClicked} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
