const pool = require('../config/db');

const Country = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM countries');
        return res.rows;
    },
    getById: async (id) => {
        const res = await pool.query('SELECT * FROM countries WHERE country_id = $1', [id]);
        return res.rows[0];
    },
    create: async (data) => {
        const { country_id, name, flag } = data;
        const res = await pool.query(
            'INSERT INTO countries (country_id, name, flag) VALUES ($1, $2, $3) RETURNING *',
            [country_id, name, flag]
        );
        return res.rows[0];
    },
    update: async (id, data) => {
        const { country_id, name, flag } = data;
        const res = await pool.query(
            'UPDATE countries SET country_id = $1, name = $2, flag = $3 WHERE country_id = $4 RETURNING *',
            [country_id, name, flag, id]
        );
        return res.rows[0];
    },
    delete: async (id) => {
        const res = await pool.query('DELETE FROM countries WHERE country_id = $1', [id]);
        return res.rowCount;
    }
};