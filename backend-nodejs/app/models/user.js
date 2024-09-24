const pool = require('../config/db');

const User = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM users');
        return res.rows;
    },
    getById: async (id) => {
        const res = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
        return res.rows[0];
    },
    create: async (data) => {
        const { user_id, username, email, password, role } = data;
        const res = await pool.query(
            'INSERT INTO users (user_id, username, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, username, email, password, role]
        );
        return res.rows[0];
    },
    update: async (id, data) => {
        const { user_id, username, email, password, role } = data;
        const res = await pool.query(
            'UPDATE users SET user_id = $1, username = $2, email = $3, password = $4, role = $5 WHERE user_id = $6 RETURNING *',
            [user_id, username, email, password, role, id]
        );
        return res.rows[0];
    },
    delete: async (id) => {
        const res = await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
        return res.rowCount;
    }
};

module.exports = User;