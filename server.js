const express = require('express');
const app = express();
const db = require('./db'); // Database connection
const cors = require('cors');

app.use(express.json()); // Middleware for parsing JSON
app.use(cors());

// Endpoint to get all products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Endpoint to add a product
app.post('/products', (req, res) => {
    const { name, price, stock } = req.body;
    db.query('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [name, price, stock], (err, results) => {
        if (err) {
            console.error('Error adding product:', err);
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: results.insertId, name, price, stock });
        }
    });
});

// Endpoint to update a product
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, qty, totalPrice, note, productId } = req.body;
    db.query('UPDATE products SET name = ?, price = ?, qty = ?, totalPrice = ?, note = ?, productId = ? WHERE id = ?', 
    [name, price, qty, totalPrice, note, productId, id], (err) => {
        if (err) {
            console.error('Error updating product:', err);
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Product updated successfully' });
        }
    });
});

// Endpoint to delete a product
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Product deleted successfully' });
        }
    });
});

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});