import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";

function AlertDialog(props) {
  return (
      <Dialog
        open={props.modalSignIn.isOpen}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <DialogTitle id="alert-dialog-title">{props.modalSignIn.message}</DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Добре
          </Button>
        </DialogActions>
      </Dialog>
  );
}
const mapState = state => {
    return {
        modalSignIn: state.modalSignIn
    };
  };
  
  const mapDispatch = ({
    modalSignIn: { handleClose }
  }) => ({
    handleClose: () => handleClose()
  });
  export default connect(mapState, mapDispatch)(AlertDialog);
  