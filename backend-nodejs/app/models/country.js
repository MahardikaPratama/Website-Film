const pool = require('../config/db');

const Country = {
    getAll: async () => {
        try {
            const res = await pool.query('SELECT * FROM countries ORDER BY country_name ASC');
            return res.rows;
        } catch (error) {
            throw new Error('Failed to get all countries: ' + error.message);
        }
    },
    getById: async (id) => {
        try {
            const res = await pool.query('SELECT * FROM countries WHERE country_id = $1', [id]);
            return res.rows[0];
        } catch (error) {
            throw new Error('Failed to get country by id: ' + error.message);
        }
    },

    create: async (data) => {
        try {
            const res = await pool.query(
                'INSERT INTO countries (country_id, country_name, flag_url) VALUES (DEFAULT, $1, $2) RETURNING *',
                [data.country_name, data.flag_url]
            );
            return res.rows[0];
        } catch (error) {
            throw new Error('Failed to create country: ' + error.message);
        }
    },
    update: async (id, data) => {
        try {
            const res = await pool.query(
                'UPDATE countries SET country_name = $1, flag_url = $2 WHERE country_id = $3 RETURNING *',
                [data.country_name, data.flag_url, id]
            );
            return res.rows[0];
        } catch (error) {
            throw new Error('Failed to update country: ' + error.message);
        }
    },
    delete: async (id) => {
        try {
            const res = await pool.query('DELETE FROM countries WHERE country_id = $1', [id]);
            return res.rowCount;
        } catch (error) {
            throw new Error('Failed to delete country: ' + error.message);
        }
    }
};

module.exports = Country;
