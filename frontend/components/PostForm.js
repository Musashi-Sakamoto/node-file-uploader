import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = () => ({
  container: {
    display: 'flex',
    marginTop: 64,
    paddingTop: 100
  },
  formContainer: {
    margin: 'auto'
  },
  TextField: {
    display: 'block'
  },
  button: {
    marginTop: 20
  }
});

const PostForm = ({
  classes, onSubmit, isOpen, onClose
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [err, setError] = useState('');

  const onSubmitClicked = () => {
    if (title.trim().length === 0 || description.trim().length === 0) {
      setError('title or description should not be blank');
      return;
    }
    setTitle('');
    setDescription('');
    setError('');
    onSubmit(title, description);
  };

  return (
    <div>
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Post</DialogTitle>
            <DialogContent>
            <TextField
            value={title}
            onChange={e => setTitle(e.target.value)}
              autoFocus
              margin="dense"
              id="title"
              label="title"
              type="text"
              fullWidth
            />
            <TextField
            value={description}
            onChange={e => setDescription(e.target.value)}
              autoFocus
              margin="dense"
              id="description"
              label="description"
              type="text"
              multiline={true}
              rows={5}
              fullWidth
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSubmitClicked} color="primary">
                    Post
                </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default withStyles(styles)(PostForm);
