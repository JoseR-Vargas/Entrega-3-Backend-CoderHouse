import express from 'express';
import { Product } from '../models/product.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
        if (query === 'disponible') {
            filter.disponible = true;
        } else {
            filter.categoria = query;
        }
    }

    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort ? { precio: sort === 'asc' ? 1 : -1 } : {},
    };

    try {
        const products = await Product.paginate(filter, options);
        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;
