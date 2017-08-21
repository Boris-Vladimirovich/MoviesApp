import express from 'express';
import bodyParser from 'body-parser';
import * as db from './utils/DataBaseUtils';
import { serverPort } from '../etc/config.json';

const app = express();

db.setUpConnection();

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/api/movies', (req,res) => {
    db.getMovies().then(data => res.send(data), err => res.send(err));
});

app.post('/api/movies', (req,res) => {
    db.createMovie(req.body).then(data => res.send(data), err => res.send(err));
});

app.put('/api/movies/:id', (req,res) => {
    db.updateMovie(req.params.id, req.body).then(data => res.send(data), err => res.send(err));
});

app.delete('/api/movies/:id', (req,res) => {
    db.deleteMovie(req.params.id).then(data => res.send(data), err => res.send(err));
});

app.post('/api/movies/upload', (req,res) => {
    db.uploadMovies(req.body).then(data => res.send(data), err => res.send(err));
});

app.get('*', (req,res) => {
    res.redirect('/');
});

const server = app.listen(serverPort, () => {
    console.log(`Server is running on ${serverPort}`);
});

export default server;