import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player';

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
  },
  input: {
    display: 'none'
  },
  previewImage: {
    maxWidth: 552
  }
});

const PostForm = ({
  classes, onSubmit, isOpen, onClose, editedPost, enqueueSnackbar
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const onSubmitClicked = () => {
    if (title.trim().length === 0 || description.trim().length === 0) {
      enqueueSnackbar('title or description should not be blank', { variant: 'error' });
      return;
    }
    onSubmit(title, description, file);
    setTitle('');
    setDescription('');
  };

  const onImagePick = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setTitle(editedPost ? editedPost.title : '');
    setDescription(editedPost ? editedPost.description : '');
    setFile(null);
    setImagePreviewUrl('');
  }, [editedPost]);

  return (
    <div>
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">{editedPost !== null ? 'Edit' : 'Post'}</DialogTitle>
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
            {imagePreviewUrl !== '' && (
              file.type.split('/')[0] === 'video'
                ? <ReactPlayer width={400} url={imagePreviewUrl} playing loop/>
                : <img className={classes.previewImage} src={imagePreviewUrl} />
            )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <input
                  accept="image/*,video/*"
                  className={classes.input}
                  id="text-button-file"
                  onChange={onImagePick}
                  type="file" />
                  <label htmlFor="text-button-file">
                    <Button component="span">
                      Image
                    </Button>
                  </label>
                <Button onClick={onSubmitClicked} color="primary">
                  {editedPost !== null ? 'Edit' : 'Post'}
                </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default withSnackbar(withStyles(styles)(PostForm));
