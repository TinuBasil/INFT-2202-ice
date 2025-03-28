const express = require('express');
const path = require('path');
const { config } = require('dotenv');
const { connectDb } = require('./lib/db');
const productRoutes = require('./routes/products.routes.js');

config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve contact.html for the root path
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Serve contact.html for /contact
app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Serve about.html for /about
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});


app.use("/api/products",productRoutes)
// Connect to MongoDB before starting the server
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to start server due to DB connection error:", err);
    process.exit(1);
});