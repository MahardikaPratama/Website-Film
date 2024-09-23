const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getAllMovies); // Get All Movies with Pagination
router.get('/search', movieController.searchMovies); // Search Movies with Pagination
router.get('/filter-sort', movieController.filterSortMovies); // Filter & Sort Movies with Pagination
router.get('/filter-country', movieController.filterMoviesByCountry); // Filter Movies by Country with Pagination
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);
router.post('/wishlist', movieController.addToWishlist);

module.exports = router;