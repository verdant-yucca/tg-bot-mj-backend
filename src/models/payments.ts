import mongoose, { Document } from 'mongoose';

interface Payments {
    userId: string;
    name?: string;
    price?: string;
    count?: string;
}

interface PaymentsModel extends Payments, Document {}

const paymentsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    name: String,
    count: String,
    price: String,
});
const Payments = mongoose.model<PaymentsModel>('payments', paymentsSchema);

export default Payments;
