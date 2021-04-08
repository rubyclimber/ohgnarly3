import mongoose, {Schema, Document} from 'mongoose';

const messageSchema = new Schema({
    messageBody: String,
    userId: String,
    conversationId: String,
    createdAt: {type: Date, default: Date.now}
});

export interface Message {
    messageBody: string;
    userId: string;
    conversationId?: string;
    createdAt?: Date;
}

export interface MessageDocument extends Message, Document {
}

export const MessageModel = mongoose.model("Message", messageSchema, "Messages");
