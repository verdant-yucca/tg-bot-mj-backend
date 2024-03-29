import mongoose, { Document } from 'mongoose';

interface Package {
    name: string;
    price?: number;
    dateCreate?: Date;
    count?: number;
}

interface PackageModel extends Package, Document {}

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
const Package = mongoose.model<PackageModel>('package', packageSchema);

export default Package;
