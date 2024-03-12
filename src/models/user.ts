import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface User {
    chatId: string;
    languageCode?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    avatarPath?: string;
    lastAuth?: string;
    createDate?: string;
}

interface UserModel extends User, Document {}

const userSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
        unique: true,
    },
    languageCode: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    avatarPath: {
        type: String,
        required: false,
    },
    lastAuth: {
        type: String,
        required: false,
    },
    createDate: {
        type: String,
        required: false,
    },
});
const User = mongoose.model<UserModel>('user', userSchema);

export default User;
