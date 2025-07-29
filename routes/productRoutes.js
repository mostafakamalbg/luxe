const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST API: Add product
router.post('/api/products', async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = new Product({ name, price });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to save product" });
  }
});

// GET API: Get all products
router.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
