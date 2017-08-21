import React from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

class UpdateModal extends React.Component{
    constructor(){
        super();
        this.state = {
            actors: [],
            actorName: '',
            year: '',
            name: '',
            format: ''
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.selectedMovie.name,
            year: nextProps.selectedMovie.year,
            format: nextProps.selectedMovie.format,
            actors: nextProps.selectedMovie.actors
        });
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleFormatChange = (event) => {
        this.setState({
            format: event.target.value
        });
    };

    handleActorDelete = (i) => {
        let tmp = [...this.state.actors];
        tmp.splice(i,1);
        this.setState({
            actors: tmp
        });
    };

    handleActorNameChange = (event) => {
        let name = event.target.value;
        if(name.trim() === ','){name = ''}
        if(name.length > 1 && name.slice(-1) === ','){
            name = name.substring(0, name.length-1);
            this.setState({
                actors: [...this.state.actors, name.trim()],
                actorName: ''
            });
        } else {
            this.setState({
                actorName: name
            });
        }
    };

    handleYearChange = (event) => {
        if(/^\d+$/.test(event.target.value) || event.target.value === ''){
            this.setState({
                year: event.target.value
            });
        }
    };

    handleUpdateMovie = () => {
        let updated = {
            ...this.props.selectedMovie,
            name: this.state.name,
            year: this.state.year,
            format: this.state.format,
            actors: this.state.actors
        };
        if(JSON.stringify(updated) !== JSON.stringify(this.props.selectedMovie)){
            this.props.updateMovie(updated._id ,updated);
        }
        this.props.onClose();
    };
    render(){
        return(
            <Dialog open={this.props.isOpen} onRequestClose={this.props.onClose}>
                <DialogTitle>
                    Edit movie
                </DialogTitle>
                <DialogContent>
                    <TextField
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        label="Title"
                        placeholder="Enter movie name"
                        fullWidth
                        required
                        error={!this.state.name}
                    />
                    <TextField
                        value={this.state.year}
                        onChange={this.handleYearChange}
                        label="Year"
                        placeholder="Enter year"
                        fullWidth
                        required
                        error={!this.state.name}
                    />
                    <TextField
                        value={this.state.format}
                        onChange={this.handleFormatChange}
                        label="Format"
                        placeholder="Enter format"
                        fullWidth
                        required
                        error={!this.state.format}
                    />
                    <TextField
                        value={this.state.actorName}
                        label="Actor"
                        placeholder="Add actors (separated by commas)"
                        fullWidth
                        onChange={this.handleActorNameChange}
                    />
                    {
                        this.state.actors && this.state.actors.map((el,i) => {
                            return (
                                <Chip
                                    style={{display: "inline-flex", margin: "3px"}}
                                    label={el}
                                    key={i}
                                    onRequestDelete={() => {this.handleActorDelete(i)}}
                                />
                            )
                        })
                    }

                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        raised
                        onClick={this.handleUpdateMovie}
                        disabled={!(this.state.name && this.state.year && this.state.format)}
                    >
                        OK
                    </Button>
                    <Button color="accent" raised onClick={this.props.onClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default UpdateModal;