const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', movieController.getAllMovies); // Get All Movies with Pagination
router.get('/search', movieController.searchMovies); // Search Movies with Pagination
router.get('/filter-sort', movieController.filterSortMovies); // Filter & Sort Movies with Pagination
router.get('/:id', movieController.getMovieById);
router.get('/same-genre/:movie_id', movieController.getMovieBySameGenre);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);
router.post('/wishlist', authenticateToken, movieController.addToWishlist);
router.get('/wishlist/:user_id', authenticateToken, movieController.getWishlist);

module.exports = router;