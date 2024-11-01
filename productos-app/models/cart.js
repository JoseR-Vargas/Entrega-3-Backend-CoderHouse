import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            cantidad: { type: Number, default: 1 },
        },
    ],
});

export const Cart = mongoose.model('Cart', cartSchema);
