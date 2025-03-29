const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3022;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('src/client'));

// Use the movie routes
app.use('/api/movies', movieRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
