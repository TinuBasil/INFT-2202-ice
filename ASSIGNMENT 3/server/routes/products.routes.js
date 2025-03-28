const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model.js");

// POST /api/products
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/products
router.get("/", async (req, res) => {
    try {
        const { page = 1, perPage = 10 } = req.query;
        const products = await Product.find()
            .limit(perPage)
            .skip((page - 1) * perPage);
        const total = await Product.countDocuments();
        
        res.json({
            page: parseInt(page),
            perPage: parseInt(perPage),
            total,
            products,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/:name
router.get("/:name", async (req, res) => {
    try {
        const productName = req.params.name;
        const foundProduct = await Product.findOne({ name: productName });
        
        if (foundProduct) {
            res.json(foundProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/products/:id
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({name:req.params.id});
        
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;