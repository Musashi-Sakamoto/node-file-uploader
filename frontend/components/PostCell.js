import React, { useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  textRoot: {
    width: 240
  },
  primary: {
    textAlign: 'center'
  },
  secondary: {
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  delete: {
    height: 40,
    width: 40
  },
  edit: {
    marginLeft: 20,
    height: 40,
    width: 40
  },
  description: {
    width: 400,
    padding: 16,
    wordBreak: 'break-word'
  },
  image: {
    width: 400
  }
});

const PostCell = ({
  onDelete, onEdit, post, classes
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
        <ListItem onClick={() => setIsOpen(!isOpen)}>
            <ListItemText classes={{
              root: classes.textRoot,
              primary: classes.primary
            }} primary={post.title}/>
            <Fab className={classes.delete} size='small' onClick={onDelete(post)}>
                <DeleteIcon />
            </Fab>
            <Fab className={classes.edit} size='small' onClick={onEdit(post)}>
                <EditIcon />
            </Fab>
        </ListItem>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Typography className={classes.description}>
              {post.description}
          </Typography>
          {post.presignedUrl && (
              <img className={classes.image} src={post.presignedUrl} />
          )}
        </Collapse>
        <Divider />
    </React.Fragment>
  );
};

export default withStyles(styles)(PostCell);
