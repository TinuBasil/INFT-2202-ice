const express = require('express');
const router = express.Router();
const movies = require('./data/movies.js');
console.log(movies,"This is the movies");
// GET /api/movies
router.get('/', (req, res) => {
    let { genre, rating } = req.query;
    

    // Convert rating to number if provided
    rating = rating ? parseFloat(rating) : null;

    if (rating && (isNaN(rating) || rating < 1 || rating > 10)) {
        return res.status(400).json({ error: "Rating must be a number between 1 and 10." });
    }

    let filteredMovies = movies;

    // Filter by rating
    if (rating !== null) {
        filteredMovies = filteredMovies.filter(movie => movie.rating >= rating);
    }

    // Filter by genre (case insensitive)
    if (genre) {
        filteredMovies = filteredMovies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }

    // Sort by rating (highest to lowest)
    filteredMovies.sort((a, b) => b.rating - a.rating);

    res.json(filteredMovies);
});

module.exports = router;
