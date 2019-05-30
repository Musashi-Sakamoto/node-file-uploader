import React, { useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const styles = theme => ({
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
    width: 40,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 5
    }
  },
  description: {
    width: 400,
    padding: 16,
    wordBreak: 'break-word',
    [theme.breakpoints.down('sm')]: {
      width: 320
    }
  },
  image: {
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: 320
    }
  },
  smallFab: {
    [theme.breakpoints.down('sm')]: {
      width: 30,
      height: 30,
      minHeight: 30
    }
  }
});

const PostCell = ({
  onDelete, onEdit, post, classes, width
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
        <ListItem onClick={() => setIsOpen(!isOpen)}>
            <ListItemText classes={{
              root: classes.textRoot,
              primary: classes.primary,
              secondary: classes.secondary
            }} primary={post.title} secondary={post.createdAt}/>
            <Fab classes={{
              sizeSmall: classes.smallFab
            }} className={classes.delete} size='small' onClick={onDelete(post)}>
                <DeleteIcon />
            </Fab>
            <Fab classes={{
              sizeSmall: classes.smallFab
            }} className={classes.edit} size='small' onClick={onEdit(post)}>
                <EditIcon />
            </Fab>
        </ListItem>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Typography className={classes.description}>
              {post.description}
          </Typography>
          {post.presignedUrl && (
            post.mediaType === 'video'
              ? <ReactPlayer volume={0} muted={true} playsinline height='auto' width={isWidthDown('sm', width) ? 320 : 400} url={[{ src: post.presignedUrl, type: 'video/mp4' }]} playing loop/>
              : <img className={classes.image} src={post.presignedUrl} />
          )}
        </Collapse>
        <Divider />
    </React.Fragment>
  );
};

export default withStyles(styles)(withWidth()(PostCell));
