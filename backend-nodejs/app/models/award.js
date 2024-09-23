const pool = require('../config/db');
const { update } = require('../controllers/movieController');

const Award = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM awards');
        return res.rows;
    },
    getById: async (id) => {
        const res = await pool.query('SELECT * FROM awards WHERE award_id = $1', [id]);
        return res.rows[0];
    },
    create: async (data) => {
        const { award_id, name, year, country_id } = data;
        const res = await pool.query(
            'INSERT INTO awards (award_id, name, year, country_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [award_id, name, year, country_id]
        );
        return res.rows[0];
    },
    update: async (id, data) => {
        const { award_id, name, year, country_id } = data;
        const res = await pool.query(
            'UPDATE awards SET award_id = $1, name = $2, year = $3, country_id = $4 WHERE award_id = $5 RETURNING *',
            [award_id, name, year, country_id, id]
        );
        return res.rows[0];
    },
    delete: async (id) => {
        const res = await pool.query('DELETE FROM awards WHERE award_id = $1', [id]);
        return res.rowCount;
    }
};

module.exports = Award;
