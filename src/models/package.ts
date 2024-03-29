import mongoose, { Document } from 'mongoose';

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    dateCreate: {
        type: Date,
        default: Date.now,
    },
    count: Number,
});
const Package = mongoose.model('package', packageSchema);

export default Package;
