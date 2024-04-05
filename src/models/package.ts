import mongoose, { Document } from 'mongoose';

interface Package {
    name: string;
    price?: number;
    dateCreate?: Date;
    count?: number;
    title?: string;
    description?: string;
    photoUrl?: string;
    photoWidth?: number;
    photoHeight?: number;
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
    title: String,
    description: String,
    photoUrl: String,
    photoWidth: Number,
    photoHeight: Number,
});
const Package = mongoose.model<PackageModel>('package', packageSchema);

export default Package;
