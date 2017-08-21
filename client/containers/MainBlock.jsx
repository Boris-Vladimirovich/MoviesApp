import React from 'react';
import {connect} from 'react-redux';

import * as Actions from '../actions/movieActions';

import SideBar from './SideBar.jsx';
import UpdateModal from '../components/UpdateModal.jsx';
import DeleteModal from "../components/DeleteModal.jsx";
import AddModal from '../components/AddModal.jsx';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

class MainBlock extends React.Component{
    constructor(){
        super();
        this.state = {
            isDeleteModalOpen: false,
            isUpdateModalOpen: false
        }
    };

    handleUpdateModalOpen = () => {
        this.setState({
            isUpdateModalOpen: true
        });
    };

    handleUpdateModalClose = () => {
        this.setState({
            isUpdateModalOpen: false
        });
    };

    handleDeleteModalOpen = () => {
        this.setState({
            isDeleteModalOpen: true
        });
    };

    handleDeleteModalClose = () => {
        this.setState({
            isDeleteModalOpen: false
        });
    };

    handleUpload = event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = e => {
                const array = e.target.result.split(/\n{2,}/gm).filter(Boolean);
                let movies = [];
                for(let i = 0; i < array.length; i++){
                    try {
                        const movie = {};
                        movie.name = /(\btitle): (.+)/gmi.exec(array[i])[2];
                        movie.year = /(\brelease year): (.+)/gmi.exec(array[i])[2];
                        movie.format = /(\bformat): (.+)/gmi.exec(array[i])[2];
                        movie.actors = /(\bstars): (.+)/gmi.exec(array[i])[2].split(/, /);
                        movies.push(movie);
                    }
                    catch (e){
                        alert("Invalid file!");
                        console.log("Invalid file");
                        console.log(e);
                        movies = [];
                        break;
                    }
                }
                movies.length && this.props.uploadMovies(movies);
            };
        } else {
            console.log("Failed to upload file");
        }
    };

    render(){
        return(
            <div style={{overflowY: 'auto'}}>
                <AddModal
                    isOpen={this.props.isAddModalOpen}
                    addMovie={this.props.addMovie}
                    onClose={this.props.closeAddModal}
                />
                <DeleteModal
                    isOpen={this.state.isDeleteModalOpen}
                    onClose={this.handleDeleteModalClose}
                    deleteMovie={this.props.deleteMovie}
                    deleteAll={this.props.deleteAll}
                    selectedMovie={this.props.selectedMovie}
                    selectMovie={this.props.selectMovie}
                />
                <UpdateModal
                    selectedMovie={this.props.selectedMovie}
                    isOpen={this.state.isUpdateModalOpen}
                    onClose={this.handleUpdateModalClose}
                    updateMovie={this.props.updateMovie}
                />
                <Drawer
                    open={this.props.isDrawerOpen}
                    onRequestClose={this.props.closeDrawer}
                >
                    <SideBar/>
                </Drawer>
                <AppBar position="static">
                    <Toolbar>
                        <Hidden mdUp>
                            <IconButton
                                color="contrast"
                                onClick={this.props.openDrawer}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Hidden>
                        <Typography type="title" color="inherit" style={{flex: 1}}>
                            {this.props.selectedMovie.name}
                        </Typography>
                        {
                            this.props.selectedMovie.name && (
                                <div>
                                    <IconButton
                                        color="contrast"
                                        onClick={this.handleUpdateModalOpen}
                                    >
                                        <ModeEditIcon/>
                                    </IconButton>
                                    <IconButton
                                        color="accent"
                                        onClick={this.handleDeleteModalOpen}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            )
                        }
                    </Toolbar>
                </AppBar>
                {
                    !this.props.movies.length ?
                        (<span>
                            <Typography align="center" type="display1" style={{margin: "30px"}}>
                                You have no movies yet
                            </Typography>
                            <Typography align="center" type="button" style={{margin: "30px"}}>
                                You may
                                <input
                                    accept=".txt"
                                    id="file"
                                    type="file"
                                    style={{display: "none"}}
                                    onChange={this.handleUpload}
                                />
                                <label htmlFor="file">
                                    <Button component="span">
                                        Upload
                                    </Button>
                                </label> it from txt file
                            </Typography>
                        </span>):
                    !this.props.selectedMovie.name && (
                        <Typography align="center" type="display1" style={{margin: "30px"}}>
                            Click on movie to review it
                        </Typography>)
                }

                    {
                    this.props.selectedMovie.name &&
                        (<Typography component="span" align="justify" style={{margin: "30px"}}>
                            <Typography type="title" style={{margin: "5px"}}>
                                Release year: {this.props.selectedMovie.year}
                            </Typography>
                            <Typography type="title" style={{margin: "5px"}}>
                                Format: {this.props.selectedMovie.format}
                            </Typography>
                            {
                                this.props.selectedMovie.actors.map(el => {
                                    return (
                                        <Chip
                                            key={el}
                                            style={{height: "32px", display: "inline-flex", margin: "5px"}}
                                            avatar={<Avatar>{el.charAt(0)}</Avatar>}
                                            label={el}
                                        />
                                    )
                                })
                            }
                        </Typography>)
                    }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    movies: state.movies.list,
    selectedMovie: state.movies.selectedMovie,
    isAddModalOpen: state.movies.isAddModalOpen,
    isDrawerOpen: state.movies.isDrawerOpen
});
const mapDispatchToProps = dispatch => ({
    uploadMovies: (data) => {dispatch(Actions.uploadMovies(data))},
    selectMovie: (data) => {dispatch(Actions.selectMovie(data))},
    deleteMovie: (id) => {dispatch(Actions.deleteMovie(id))},
    updateMovie: (id, data) => {dispatch(Actions.updateMovie(id, data))},
    deleteAll: (id) => {dispatch(Actions.deleteAll(id))},
    addMovie: (data) => {dispatch(Actions.addMovie(data))},
    openAddModal: () => {dispatch(Actions.openAddModal())},
    closeAddModal: () => {dispatch(Actions.closeAddModal())},
    openDrawer: () => {dispatch(Actions.openDrawer())},
    closeDrawer: () => {dispatch(Actions.closeDrawer())}
});

export default connect(mapStateToProps,mapDispatchToProps)(MainBlock);