import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Sale', saleSchema);
