/**
 * Created by asmitty on 2/20/18.
 */
import mongoose from 'mongoose';
import {Schema, Document} from 'mongoose';

export const movieSchema = new Schema({
    title: String,
    description: String,
    userId: String,
    director: String,
    favorite: {type: Boolean, default: false},
    wishlist: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    imdbid: String,
    format: String,
    rating: {type: Number, default: 0},
    poster: String
});

export interface Movie {
    title: string;
    description: string;
    userId: string;
    director: string;
    favorite: boolean;
    wishlist: boolean;
    createdAt?: Date;
    imdbid: string;
    format: string;
    rating: number;
    poster: string;
}

export interface MovieDocument extends Movie, Document {}

export const MovieModel = mongoose.model("Movie", movieSchema, "Movies");