const pool = require('../config/db');

const Movie = {
    // Get All Movies with Pagination
    getAllMovies: async (page, limit) => {
        try {
            const offset = (page - 1) * limit;
    
            // Hitung total jumlah film
            const totalMovies = await pool.query(`SELECT COUNT(*) FROM movies`);
            const totalCount = parseInt(totalMovies.rows[0].count, 10);
    
            // Ambil data film
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
    
            return {
                movies: res.rows,  // Data film
                totalCount: totalCount // Jumlah total data
            };
        } catch (error) {
            throw new Error('Failed to get all movies: ' + error.message);
        }
    },
                
    

    // Search Movies with Pagination
    searchMovies: async (keyword, page, limit) => {
        try {
            const offset = (page - 1) * limit;
            const res = await pool.query(
                `SELECT m.movie_id, m.title, m.year, 
                COALESCE(STRING_AGG(DISTINCT g.genre_name, ', '), 'No Genre') AS genres, 
                m.movie_rate, m.views, m.poster_url, m.release_status,
                COALESCE(STRING_AGG(DISTINCT a.actor_name, ', '), 'No Actors') AS actors,
                COUNT(*) OVER() AS total_count  -- Menghitung total data
                FROM movies m
                LEFT JOIN categorized_as mg ON m.movie_id = mg.movie_id
                LEFT JOIN genres g ON mg.genre_id = g.genre_id
                LEFT JOIN acted_in ai ON m.movie_id = ai.movie_id
                LEFT JOIN actors a ON ai.actor_id = a.actor_id
                WHERE m.title ILIKE $1 OR m.alternative_title ILIKE $1 OR m.synopsis ILIKE $1 OR a.actor_name ILIKE $1
                GROUP BY m.movie_id, m.title, m.year, m.movie_rate, m.views, m.poster_url, m.release_status
                ORDER BY m.title ASC 
                LIMIT $2 OFFSET $3`,
                [`%${keyword}%`, limit, offset]
            );
            return {
                movies: res.rows,  // Data hasil pencarian
                totalCount: res.rows.length > 0 ? res.rows[0].total_count : 0  // Jumlah total data
            };
        } catch (error) {
            throw new Error('Failed to search movies: ' + error.message);
        }
    },
        

    // Model method to filter and sort movies with pagination
    filterSortMovies: async (filters, sort_by, page, limit) => {
        try {
            // Inisialisasi query dasar
            let query = `
                SELECT
                    m.movie_id,
                    m.title,
                    m.year,
                    COALESCE(STRING_AGG(g.genre_name, ', '), 'No Genre') AS genres,
                    m.movie_rate,
                    m.views,
                    m.poster_url,
                    m.release_status,
                    COUNT(*) OVER() AS total_count  -- Menghitung total data
                FROM movies m
                LEFT JOIN categorized_as mg ON m.movie_id = mg.movie_id
                LEFT JOIN genres g ON mg.genre_id = g.genre_id
            `;

            // Inisialisasi array untuk menyimpan kondisi WHERE dan parameter
            let conditions = [];
            let queryParams = [];

            // Tambahkan kondisi berdasarkan filter yang diterima
            if (filters.year) {
                queryParams.push(filters.year);
                conditions.push(`m.year = $${queryParams.length}`);
            }

            if (filters.genre_name) {
                queryParams.push(filters.genre_name);
                conditions.push(`g.genre_name = $${queryParams.length}`);
            }

            if (filters.release_status) {
                queryParams.push(filters.release_status);
                conditions.push(`m.release_status = $${queryParams.length}`);
            }

            if (filters.platform_name) {
                queryParams.push(filters.platform_name);
                conditions.push(`EXISTS (
                    SELECT 1 
                    FROM available_on mp 
                    JOIN platforms p ON mp.platform_id = p.platform_id 
                    WHERE mp.movie_id = m.movie_id 
                    AND p.platform_name = $${queryParams.length}
                )`);
            }

            if (filters.award) {
                queryParams.push(filters.award);
                conditions.push(`EXISTS (
                    SELECT 1 
                    FROM awarded ma 
                    JOIN awards a ON ma.award_id = a.award_id 
                    WHERE ma.movie_id = m.movie_id 
                    AND a.award_name = $${queryParams.length}
                )`);
            }

            if (filters.country_name) {
                queryParams.push(filters.country_name);
                conditions.push(`m.country_id = (SELECT country_id FROM countries WHERE country_name = $${queryParams.length})`);
            }            

            // Gabungkan kondisi WHERE jika ada
            if (conditions.length > 0) {
                query += ` WHERE ` + conditions.join(' AND ');
            }

            // Grupkan berdasarkan movie_id untuk menghindari duplikasi
            query += ` GROUP BY 
                m.movie_id, m.title, m.year, m.movie_rate, m.views,
                m.poster_url, m.release_status
            `;

            // Tambahkan sorting jika ada
            if (sort_by) {
                switch (sort_by) {
                    case 'Alphabetical (A-Z)':
                        query += ` ORDER BY m.title ASC`;
                        break;
                    case 'Alphabetical (Z-A)':
                        query += ` ORDER BY m.title DESC`;
                        break;
                    case 'Rating (Low to High)':
                        query += ` ORDER BY m.movie_rate ASC`;
                        break;
                    case 'Rating (High to Low)':
                        query += ` ORDER BY m.movie_rate DESC`;
                        break;
                    case 'Year (Old to New)':
                        query += ` ORDER BY m.year ASC`;
                        break;
                    case 'Year (New to Old)':
                        query += ` ORDER BY m.year DESC`;
                        break;
                    default:
                        query += ` ORDER BY m.title ASC`;
                }
            }

            // Tambahkan LIMIT dan OFFSET
            const offset = (page - 1) * limit;
            queryParams.push(limit, offset);
            query += ` LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`;

            // Eksekusi query
            const res = await pool.query(query, queryParams);

            return {
                movies: res.rows,  // Data film
                totalCount: res.rows.length > 0 ? res.rows[0].total_count : 0  // Jumlah total data
            };

        } catch (error) {
            throw new Error('Failed to filter and sort movies: ' + error.message);
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
