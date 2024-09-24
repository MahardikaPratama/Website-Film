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
        const { keyword = '', page = 1, limit = 10 } = req.query; 
        const movies = await Movie.searchMovies(keyword, page, limit);
        res.json(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Filtering and Sorting Movies with Pagination
exports.filterSortMovies = async (req, res) => {
    try {
        // Ambil parameter dari request
        const { year, genre_name, release_status, platform_name, award, country_name, sort_by, page = 1, limit = 10 } = req.query;

        // Buat objek filter
        const filters = {
            year,
            genre_name,
            release_status,
            platform_name,
            award,
            country_name
        };

        // Panggil fungsi model dengan filter dan sorting
        const movies = await Movie.filterSortMovies(filters, sort_by, page, limit);

        // Kirimkan hasilnya
        res.json(movies);
    } catch (error) {
        // Jika ada error, kirim pesan error
        res.status(500).send('Failed to filter and sort movies: ' + error.message);
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
