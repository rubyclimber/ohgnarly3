import mongoose from 'mongoose';
import {User, UserDocument, userSchema} from '../models/user';

const userModel = mongoose.model("User", userSchema, "Users");
const chatUserModel = mongoose.model("ChatUser", userSchema, "ChatUsers");
export const PendingUserModel = mongoose.model("PendingUser", userSchema, "PendingUsers");

export class UserRepository {
    getUserByUserName = async (userName: string) => {
        const user = await userModel.findOne({userName: userName}).exec() as UserDocument;
        return user;
    };

    getAllUsers = async () => {
        return await userModel.find().exec() as UserDocument[];
    }

    getUserByEmailAddress = async (emailAddress: string) => {
        return await userModel.findOne({emailAddress: emailAddress}).exec() as UserDocument;
    };

    getChatUser = async (userName: string) => {
        return await chatUserModel.findOne({userName: userName}).exec() as UserDocument;
    };

    addPendingUser = async (user: User) => {
        const pendingUser = new PendingUserModel(user);
        return pendingUser.save();
    };

    deletePendingUser = async(userName: string) => {
        return await PendingUserModel.deleteOne({userName: userName}).exec();
    }

    getAllPendingUsers = async () => {
        return await PendingUserModel.find().exec() as UserDocument[];
    };
}