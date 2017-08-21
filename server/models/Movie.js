import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
        name:   {type: String, required: true},
        year:   {type: Number, required: true},
        format: {type: String, required: true},
        actors: [{type: String}]
    });

mongoose.Promise = global.Promise;
mongoose.model('Movie', MovieSchema);