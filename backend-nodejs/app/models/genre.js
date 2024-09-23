const pool = require('../config/db');

const Genre = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM genres');
        return res.rows;
    },
    getById: async (id) => {
        const res = await pool.query('SELECT * FROM genres WHERE genre_id = $1', [id]);
        return res.rows[0];
    },
    create: async (data) => {
        const { genre_id, name } = data;
        const res = await pool.query(
            'INSERT INTO genres (genre_id, name) VALUES ($1, $2) RETURNING *',
            [genre_id, name]
        );
        return res.rows[0];
    },
    update: async (id, data) => {
        const { genre_id, name } = data;
        const res = await pool.query(
            'UPDATE genres SET genre_id = $1, name = $2 WHERE genre_id = $3 RETURNING *',
            [genre_id, name, id]
        );
        return res.rows[0];
    },
    delete: async (id) => {
        const res = await pool.query('DELETE FROM genres WHERE genre_id = $1', [id]);
        return res.rowCount;
    }
};