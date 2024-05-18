// routes/productRouter.js

const express = require('express');
const { Product } = require('../models'); // Import Product model
const { category } = require('../models');
const { product_image } = require('../models');

const router = express.Router();

// Create a product
router.post('/create', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all products
router.get('/allproduct', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get all product_image
router.get('/product_image', async (req, res) => {
  try {
    const productImage = await product_image.findAll();
    res.json(productImage);
  } catch (error) {
    console.error('Error fetching product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Product By ID contains product Image
router.get('/productDetail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the product by id
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Fetch associated product images
    const productImages = await product_image.findAll({
      where: { product_id: id },
    });

    // Combine the results
    const productDetail = {
      ...product.toJSON(),
      images: productImages,
    };

    return res.json(productDetail);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a product_image By product_id
router.get('/product_image/:product_id', async (req, res) => {
  const { product_id } = req.params;
  try {
    const products = await product_image.findAll({
      where: { product_id: parseInt(product_id, 10) },
    });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ error: 'No products found for this category' });
    }
    return res.json(products);
  } catch (error) {
    console.error('Error fetching products by category_id:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a product by categpry_id
router.get('/categoryId/:category_id', async (req, res) => {
  const { category_id } = req.params;
  try {
    const products = await Product.findAll({
      where: { category_id: parseInt(category_id, 10) },
    });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ error: 'No products found for this category' });
    }
    return res.json(products);
  } catch (error) {
    console.error('Error fetching products by category_id:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.update(req.body);
    return res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
