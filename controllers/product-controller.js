import 'dotenv/config'
import Product from '../models/product-model.js'

export async function createProduct(request, response) {
    try {
        const newProduct = new Product(request.body);
        await newProduct.save();
        response.status(200).json({ message: 'Product created' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal error, failed to create product' });
    }
}

export async function getAllProducts(request, response) {
    try {
        const products = await Product.find(null, 'name description price');
        response.status(200).json(products);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal error, failed to get all products' });
    }
}