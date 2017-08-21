import axios from 'axios';
import { apiPrefix } from '../../etc/config.json';

export default {
    getMovies () {
        return axios.get(`${apiPrefix}/movies`);
    },
    addMovie (data) {
        return axios.post(`${apiPrefix}/movies`, data);
    },
    deleteMovie (id) {
        return axios.delete(`${apiPrefix}/movies/${id}`);
    },
    updateMovie (id, data) {
        return axios.put(`${apiPrefix}/movies/${id}`, data);
    },
    uploadMovies (data) {
        return axios.post(`${apiPrefix}/movies/upload`, data);
    }
}