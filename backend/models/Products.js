import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    company: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Products', productSchema);
