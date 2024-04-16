import mongoose, { Document } from 'mongoose';

interface AccountMidjourney {
    name: string;
    customId: string;
    status: string;
    ServerId: string;
    ChannelId: string;
    DiscordToken: string;
    dateCreate: Date;
}

interface AccountMidjourneyModel extends AccountMidjourney, Document {}

const accountMidjourneySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    customId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    ServerId: {
        type: String,
        required: true,
    },
    ChannelId: {
        type: String,
        required: true,
    },
    DiscordToken: {
        type: String,
        required: true,
    },
    dateCreate: {
        type: Date,
        default: Date.now,
    },
});
const AccountMidjourney = mongoose.model<AccountMidjourneyModel>('package', accountMidjourneySchema);

export default AccountMidjourney;
