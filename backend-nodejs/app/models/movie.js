const pool = require('../config/db');

const Movie = {
    // Get All Movies with Pagination
    getAllMovies: async (page, limit) => {
        try {
            const offset = (page - 1) * limit;
            const res = await pool.query(
                `SELECT m.movie_id, m.title, m.year, 
                COALESCE(STRING_AGG(g.genre_name, ', '), 'No Genre') AS genres, 
                m.movie_rate, m.views, m.poster_url, m.release_status 
                FROM movies m 
                LEFT JOIN categorized_as mg ON m.movie_id = mg.movie_id 
                LEFT JOIN genres g ON mg.genre_id = g.genre_id 
                GROUP BY m.movie_id, m.title, m.year, m.movie_rate, m.views, m.poster_url, m.release_status 
                ORDER BY m.title ASC 
                LIMIT $1 OFFSET $2`, 
                [limit, offset]
            );
    
            return res.rows.length > 0 ? res.rows : []; 
        } catch (error) {
            throw new Error('Failed to get all movies: ' + error.message);
        }
    },        
    

    // Search Movies with Pagination
    searchMovies: async (search, page, limit) => {
        try {
            const offset = (page - 1) * limit;
            const res = await pool.query(
                'SELECT m.title, m.year, g.genre_name, m.movie_rate, m.views, m.poster_url, m.release_status ' +
                'FROM movies m ' +
                'LEFT JOIN categorized_as mg ON m.movie_id = mg.movie_id ' +
                'LEFT JOIN genres g ON mg.genre_id = g.genre_id ' +
                'WHERE m.title ILIKE $1 OR m.alternative_title ILIKE $1 OR m.synopsis ILIKE $1 ' +
                'ORDER BY m.title ASC ' +
                'LIMIT $2 OFFSET $3', 
                [`%${search}%`, limit, offset]  // Ensure correct order here
            );
            return res.rows;
        } catch (error) {
            throw new Error('Failed to search movies: ' + error.message);
        }
    },
    

    // Filtering and Sorting Movies with Pagination
    filterSortMovies: async (sort_by, filter_by, page, limit) => {
        try {
            const offset = (page - 1) * limit;
            let query = 
                'SELECT m.title, m.year, g.genre_name, m.movie_rate, m.views, m.poster_url, m.release_status ' +
                'FROM movies m ' +
                'LEFT JOIN categorized_as mg ON m.movie_id = mg.movie_id ' +
                'LEFT JOIN genres g ON mg.genre_id = g.genre_id ';

            // Filter by genre_name, release_status, year, platform, etc.
            if (filter_by) {
                query += 'WHERE ' + filter_by + ' ';
            }

            // Sort by title, year, movie_rate, views
            query += `ORDER BY ${sort_by || 'm.title'} ASC LIMIT $1 OFFSET $2`;
            
            const res = await pool.query(query, [limit, offset]);
            return res.rows;
        } catch (error) {
            throw new Error('Failed to filter and sort movies: ' + error.message);
        }
    },

    // Filter Movies by Country with Pagination
    filterMoviesByCountry: async (country, page, limit) => {
        try {
            const offset = (page - 1) * limit;
            const res = await pool.query(
                'SELECT m.title, m.year, g.genre_name, m.movie_rate, m.views, m.poster_url, m.release_status ' +
                'FROM movies m ' +
                'LEFT JOIN categorized_as mg ON m.movie_id = mg.movie_id ' +
                'LEFT JOIN genres g ON mg.genre_id = g.genre_id ' +
                'WHERE m.country_id = (SELECT country_id FROM countries WHERE country_name = $1) ' +
                'ORDER BY m.title ASC ' +
                'LIMIT $2 OFFSET $3', [country, limit, offset]
            );
            return res.rows;
        } catch (error) {
            throw new Error('Failed to filter movies by country: ' + error.message);
        }
    },    
    getById: async (id) => {
        try {
            const res = await pool.query('SELECT * FROM movies WHERE movie_id = $1', [id]);
            return res.rows[0];
        } catch (error) {
            throw new Error('Failed to get movie by id: ' + error.message);
        }
    },
    create: async (data) => {
        const { poster_url, title, alternative_title, movie_rate, views, year, synopsis, release_status, approval_status, link_trailer, country_id } = data;
        try {
            const res = await pool.query(
                'INSERT INTO movies (poster_url, title, alternative_title, movie_rate, views, year, synopsis, release_status, approval_status, link_trailer, country_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
                [poster_url, title, alternative_title, movie_rate, views, year, synopsis, release_status, approval_status, link_trailer, country_id]
            );
            return res.rows[0];
        } catch (error) {
            throw new Error('Failed to create movie: ' + error.message);
        }
    },
    update: async (id, data) => {
        const { poster_url, title, alternative_title, movie_rate, views, year, synopsis, release_status, approval_status, link_trailer, country_id } = data;
        try {
            const res = await pool.query(
                'UPDATE movies SET poster_url = $1, title = $2, alternative_title = $3, movie_rate = $4, views = $5, year = $6, synopsis = $7, release_status = $8, approval_status = $9, link_trailer = $10, country_id = $11 WHERE movie_id = $12 RETURNING *',
                [poster_url, title, alternative_title, movie_rate, views, year, synopsis, release_status, approval_status, link_trailer, country_id, id]
            );
            return res.rows[0];
        } catch (error) {
            throw new Error('Failed to update movie: ' + error.message);
        }
    },
    delete: async (id) => {
        try {
            const res = await pool.query('DELETE FROM movies WHERE movie_id = $1', [id]);
            return res.rowCount;
        } catch (error) {
            throw new Error('Failed to delete movie: ' + error.message);
        }
    },
    addToWishlist: async (user_id, movie_id) => {
        try {
            const res = await pool.query('CALL add_to_wishlist($1, $2)', [user_id, movie_id]);
            return res.rowCount > 0;
        } catch (error) {
            throw new Error('Failed to add movie to wishlist: ' + error.message);
        }
    }
};

module.exports = Movie;
