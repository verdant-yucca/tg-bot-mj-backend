import mongoose, { Document } from 'mongoose';

interface Transactions {
    chatId: string;
    prompt: string;
}

interface TransactionsModel extends Transactions, Document {}

const transactionsSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
    },
    prompt: String,
    originPrompt: String,
    dateQuery: {
        type: Date,
        default: Date.now,
    },
    waitMessageId: String,
    stage: String,
    discordMsgId: String,
    flags: String,
    buttons: String,
    action: String,
    dateUpdate: Date,
    leadTime: Number,
    waitTime: Number,
    midjourneyClientId: String,
});
const Transactions = mongoose.model<TransactionsModel>('transaction', transactionsSchema);

export default Transactions;
