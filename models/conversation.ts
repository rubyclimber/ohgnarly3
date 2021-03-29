/**
 * Created by asmitty on 7/10/18.
 */
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const conversationSchema = new Schema({
    userId1: String,
    userId2: String
});

export const messageModel = mongoose.model("Conversation", conversationSchema, "Conversations");