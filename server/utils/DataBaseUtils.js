import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Movie';

const Movie = mongoose.model('Movie');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.collectionName}` ,{useMongoClient: true});
}

export function getMovies() {
    return Movie.find();
}

export function createMovie(data) {
    const movie = new Movie(data);
    return movie.save();
}

export function updateMovie(_id, data) {
    return Movie.findByIdAndUpdate(_id, data, {new: true});
}

export function deleteMovie(id) {
    return Movie.findByIdAndRemove(id);
}

export function uploadMovies(data) {
    return Movie.insertMany(data);
}