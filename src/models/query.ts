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
    queryId: {
        type: String,
        required: true,
    },
    prompt: String,
    originPrompt: String,
    dateQuery: {
        type: Date,
        default: Date.now,
    },
    discordMsgId: String,
    flags: String,
    buttons: String,
    action: String,
    dateUpdate: Date,
    leadTime: Number,
    midjourneyClientId: String,
    waitMessageId: String,
    stage: String,
    waitTime: Number,
});
const Query = mongoose.model<QueryModel>('query', querySchema);

export default Query;
