import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    disponible: { type: Boolean, default: true },
});

export const Product = mongoose.model('Product', productSchema);
