/**
 * Created by asmitty on 9/18/19.
 */
import {Schema, Document} from 'mongoose';

export const personSchema = new Schema<PersonDocument>({
    name: String,
    age: Number,
    dob: Date,
    createdAt: {type: Date, default: Date.now}
});

export interface Person {
    name: string;
    age: number;
    dob: Date;
}

export interface PersonDocument extends Person, Document {}