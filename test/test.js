import mongoose from 'mongoose';
import '../server/models/Movie';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';

const should = chai.should();
const Movie = mongoose.model('Movie');

const movieExample = {
    name: "The Shawshank Redemption",
    format: "DVD",
    year: 1994,
    actors: ["Tim Robbins", "Morgan Freeman"]
};

chai.use(chaiHttp);

describe('Movies', () => {
    afterEach((done) => {
        Movie.remove({}, (err) => {
            done();
        });
    });
    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/POST movie', () => {
        it('it should not POST movie without some required field', (done) => {
            let {year, ...movie} = movieExample;
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('year');
                    res.body.errors.year.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('it should POST movie ', (done) => {
            chai.request(server)
                .post('/api/movies')
                .send(movieExample)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('year');
                    res.body.should.have.property('format');
                    res.body.should.have.property('actors');
                    res.body.actors.should.be.a('array');
                    done();
                });
        });
    });
    describe('/PUT/:id movie', () => {
        it('it should UPDATE movie by id', (done) => {
            let movie = new Movie(movieExample);
            movie.save((err, el) => {
                chai.request(server)
                    .put('/api/movies/' + el._id)
                    .send({format: "VHS", year: 1999})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('format').eql('VHS');
                        res.body.should.have.property('year').eql(1999);
                        res.body.should.have.property('name').eql(movieExample.name);
                        done();
                    });
            });
        });
    });
    describe('/DELETE/:id movie', () => {
        it('it should DELETE movie by id', (done) => {
            let movie = new Movie(movieExample);
            movie.save((err, movie) => {
                chai.request(server)
                    .delete('/api/movies/' + movie._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(movie._id + '');
                        chai.request(server).get('/api/movies').end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.should.have.property('length').eql(0);
                            done();
                        });
                    });
            });
        });
    });
    describe('/POST many movies', () => {
        it('it should POST array of movies' ,(done) => {
            let movies = [movieExample, movieExample];
            chai.request(server)
                .post('/api/movies/upload')
                .send(movies)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('length').eql(2);
                    done();
                });
        })
    });
});