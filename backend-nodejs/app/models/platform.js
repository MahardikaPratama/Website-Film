const pool = require('../config/db');

const Platform = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM platform');
        return res.rows;
    },
    getById: async (id) => {
        const res = await pool.query('SELECT * FROM platform WHERE platform_id = $1', [id]);
        return res.rows[0];
    },
    create: async (data) => {
        const { platform_id, name } = data;
        const res = await pool.query(
            'INSERT INTO platform (platform_id, name) VALUES ($1, $2) RETURNING *',
            [platform_id, name]
        );
        return res.rows[0];
    },
    update: async (id, data) => {
        const { platform_id, name } = data;
        const res = await pool.query(
            'UPDATE platform SET platform_id = $1, name = $2 WHERE platform_id = $3 RETURNING *',
            [platform_id, name, id]
        );
        return res.rows[0];
    },
    delete: async (id) => {
        const res = await pool.query('DELETE FROM platform WHERE platform_id = $1', [id]);
        return res.rowCount;
    }
};

module.exports = Platform;