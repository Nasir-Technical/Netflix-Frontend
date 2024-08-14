import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';  // <-- Make sure this is imported
import { useSelector, useDispatch } from 'react-redux';
import { setOpen } from '../redux/movieSlice';
import VideoBackground from './VideoBackground';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MovieDialog() { 
  const { open, id } = useSelector(store => store.movie);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            overflow: 'hidden', // Hide scrollbars
          },
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Movie Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="p-0 m-0 relative overflow-hidden">
          <VideoBackground movieId={id} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
