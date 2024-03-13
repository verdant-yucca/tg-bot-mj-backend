import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface Query {
    chatId: string;
    prompt: string;
}

interface QueryModel extends Query, Document {}

const querySchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    }, 
    dateQuery: {
        type: Date, 
        default: Date.now
    }
});
const Query = mongoose.model<QueryModel>('query', querySchema);

export default Query;
