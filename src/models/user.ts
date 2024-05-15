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
    left?: boolean;
    selectedStyle?: string;
    selectedSize?: string;
    countCompletedRequests?: string;
    payments?: Array<{ date: string; count: string; price: string }>;
}

interface UserModel extends User, Document {}
// Определяем схему вложенного объекта
const nestedSchema = new mongoose.Schema({
    date: String,
    count: String,
    price: String,
});
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
        default: false,
    },
    payments: [nestedSchema],
    selectedStyle: String,
    selectedSize: String,
    countCompletedRequests: String,
});

const User = mongoose.model<UserModel>('user', userSchema);

export default User;
