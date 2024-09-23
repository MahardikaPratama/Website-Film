const Movie = require('../models/movie');

// Get All Movies with Pagination
exports.getAllMovies = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;  // Pagination
        const movies = await Movie.getAllMovies(page, limit);
        res.json(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Search Movies with Pagination
exports.searchMovies = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        const movies = await Movie.searchMovies(search, page, limit);
        res.json(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Filtering and Sorting Movies with Pagination
exports.filterSortMovies = async (req, res) => {
    try {
        const { sort_by, filter_by, page = 1, limit = 10 } = req.query;
        const movies = await Movie.filterSortMovies(sort_by, filter_by, page, limit);
        res.json(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Filter Movies by Country with Pagination
exports.filterMoviesByCountry = async (req, res) => {
    try {
        const { country, page = 1, limit = 10 } = req.query;
        const movies = await Movie.filterMoviesByCountry(country, page, limit);
        res.json(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.getById(req.params.id);
        res.json(movie);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.update(req.params.id, req.body);
        res.json(movie);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const result = await Movie.delete(req.params.id);
        res.status(204).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const { user_id, movie_id } = req.body;
        const result = await Movie.addToWishlist(user_id, movie_id);
        if (result) {
            res.status(201).json({ message: 'Movie added to wishlist' });
        } else {
            res.status(400).json({ message: 'Movie already in wishlist' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
