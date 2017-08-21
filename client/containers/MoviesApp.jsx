import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../actions/movieActions';

import SideBar from './SideBar.jsx';
import MainBlock from './MainBlock.jsx';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';


class MoviesApp extends React.Component{

    componentWillMount(){
        this.props.getMovies();
    }

    render(){
        return(
            <Grid container justify="center" align="stretch" style={{flexGrow: 1}}>
                <Grid item xs={12} md={10} lg={8}><Paper>
                    <Grid container align="stretch" spacing={0}>
                        <Hidden smDown>
                            <Grid item xs={4}>
                                <SideBar/>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} md={8}>
                            <MainBlock/>
                        </Grid>
                    </Grid></Paper>
                </Grid>
            </Grid>
        );
    };
}

const mapStateToProps = state => ({movies: state.movies.list});
const mapDispatchToProps = dispatch => {
  return {
      getMovies: () => {
          dispatch(Actions.getMovies());
      }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoviesApp);

