// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all products with filtering, pagination, and sorting
router.get('/', async (req, res) => {
    try {
      const { category, page, order } = req.query;
      const perPage = 4;
      const skip = (page - 1) * perPage;
  
      const query = Product.find();
  
      if (category) {
        query.where('category').equals(category);
      }
  
      if (order === 'asc' || order === 'desc') {
        const sortDirection = order === 'asc' ? 1 : -1;
        query.sort({ postedAt: sortDirection });
      }
  
      const products = await query.skip(skip).limit(perPage).exec();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
