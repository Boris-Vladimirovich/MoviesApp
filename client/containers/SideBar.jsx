import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../actions/movieActions';

import MovieList from '../components/MovieList.jsx';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

class SideBar extends React.Component{

    shouldShow = movie =>{
        if(movie.name.toLowerCase().indexOf(this.props.searchQuery.toLocaleLowerCase()) !== -1){
            return true;
        }
        for(let i =0; i<movie.actors.length; i++){
            if(movie.actors[i].toLowerCase().indexOf(this.props.searchQuery.toLocaleLowerCase()) !== -1){
                return true;
            }
        }
        return false;
    };

    render(){
        return (
            <div style={{
                position: "relative",
                height: "100%",
                overflowY: "auto",
                textAlign: "right"
            }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography type="display1" color="inherit">
                            Movies
                        </Typography>
                    </Toolbar>
                </AppBar>
                <MovieList
                    movies={this.props.movies}
                    shouldShow={this.shouldShow}
                    searchQuery={this.props.searchQuery}
                    changeSearchQuery={this.props.changeSearchQuery}
                    selectMovie={this.props.selectMovie}
                    closeDrawer={this.props.closeDrawer}
                />
                <Button
                    fab
                    color="primary"
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        marginLeft: '-80px'
                    }}
                    onClick={() => {
                        this.props.openAddModal();
                        this.props.closeDrawer();
                    }}
                >
                    <AddIcon />
                </Button>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    movies: state.movies.list,
    searchQuery: state.movies.searchQuery
});
const mapDispatchToProps = dispatch => ({
    selectMovie: (data) => {dispatch(Actions.selectMovie(data))},
    changeSearchQuery: (data) => {dispatch(Actions.changeSearchQuery(data))},
    openAddModal: () => {dispatch(Actions.openAddModal())},
    closeAddModal: () => {dispatch(Actions.closeAddModal())},
    closeDrawer: () => {dispatch(Actions.closeDrawer())}
});
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);