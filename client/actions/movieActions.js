import constants from '../constants/AppConstants';
import api from '../api'

export function getMovies() {
    return (dispatch) => {
        api.getMovies().then(
            ({data}) => dispatch({
                type: constants.GET_MOVIES,
                payload: data.sort((a,b) => (a.name.toLowerCase() < b.name.toLowerCase())? -1: (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0)
            })
        );

    }
}

export function addMovie(data) {
    return (dispatch) => {
        api.addMovie(data).then(
            ({data}) => {
                dispatch(selectMovie(data));
                dispatch(getMovies());
            }

        );
    }
}

export function changeSearchQuery(data) {
    return {
        type: constants.CHANGE_SEARCH_QUERY,
        payload: data
    }
}

export function selectMovie(data) {
    return (dispatch, getState) => {
        if(JSON.stringify(getState().movies.selectedMovie) !== JSON.stringify(data)){
            dispatch({
                type: constants.SELECT_MOVIE,
                payload: data
            });
        }
    };
}

export function deleteMovie(id) {
    return (dispatch) => {
        api.deleteMovie(id).then(
            dispatch(getMovies())
        );
    }
}

export function updateMovie(id, data) {
    return (dispatch) => {
        api.updateMovie(id, data).then(
            () => {
                dispatch(getMovies());
                dispatch(selectMovie(data));
        });
    }
}

export function uploadMovies(data) {
    return (dispatch) => {
        api.uploadMovies(data).then(
            () => {
                dispatch(getMovies());
            }
        );
    }
}

export function openAddModal() {
    return {
        type: constants.OPEN_ADD_MODAL
    }
}

export function closeAddModal() {
    return {
        type: constants.CLOSE_ADD_MODAL
    }
}

export function openDrawer() {
    return {
        type: constants.OPEN_DRAWER
    }
}

export function closeDrawer() {
    return (dispatch, getState) => {
        if(getState().movies.isDrawerOpen){
            dispatch({
                type: constants.CLOSE_DRAWER
            });
        }
    };
}
