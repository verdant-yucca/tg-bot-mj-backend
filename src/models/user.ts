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
    countFreeQueries?: string;
    countQueries?: string;
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
    },
    username: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    avatarPath: {
        type: String,
    },
    lastAuth: {
        type: String,
    },
    createDate: {
        type: String,
    },
    countFreeQueries: {
        type: String,
    },
    countQueries: {
        type: String,
    },
    left: {
        type: Boolean,
        default: true,
    },
});
const User = mongoose.model<UserModel>('user', userSchema);

export default User;
