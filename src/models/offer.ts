import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    factor: {
        type: Number,
        required: true,
    },
    dateCreate: {
        type: Date,
        default: Date.now,
    },
    dateUpdate: Date,
    dateStart: Date,
    dateEnd: Date,
});
const Offer = mongoose.model('offer', offerSchema);

export default Offer;
