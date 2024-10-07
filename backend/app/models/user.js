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

    getByEmail: async (email) => {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows[0];
    },

    getByUsername: async (username) => {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rows[0];
    },

    create: async (data) => {
        const { username, email, password = null } = data;
        await pool.query('CALL insert_user($1, $2, $3)', [username, email, password]);
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows[0];
    },

    update: async (user_id, data) => {
        const { username, email, password } = data;
        const res = await pool.query(
            'UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *',
            [username, email, password, user_id]
        );
        return res.rows[0];
    },

    deleteUsers: async (id) => {
        const res = await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
        return res.rowCount;
    }
};

module.exports = User;
