import React from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class DeleteModal extends React.Component{
    render(){
        return(
            <Dialog
                open={this.props.isOpen}
                onRequestClose={this.props.onClose}
            >
                <DialogTitle>
                    Confirm delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        raised
                        color="primary"
                        onClick={()=>{
                            this.props.deleteMovie(this.props.selectedMovie._id);
                            this.props.selectMovie({});
                            this.props.onClose()
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        raised
                        color="accent"
                        onClick={()=>{this.props.onClose()}}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeleteModal;