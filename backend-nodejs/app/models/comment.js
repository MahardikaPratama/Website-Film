const pool = require('../config/db');

const Comment = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM comments');
        return res.rows;
    },
    getById: async (id) => {
        const res = await pool.query('SELECT * FROM comments WHERE comment_id = $1', [id]);
        return res.rows[0];
    },
    create: async (data) => {
        const { comment_id, rate, detail_comment, approvalstatus, user_id, movie_id } = data;
        const res = await pool.query(
            'INSERT INTO comments (comment_id, rate, detail_comment, approvalstatus, user_id, movie_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [comment_id, rate, detail_comment, approvalstatus, user_id, movie_id]
        );
        return res.rows[0];
    },
    update: async (id, data) => {
        const { comment_id, rate, detail_comment, approvalstatus, user_id, movie_id } = data;
        const res = await pool.query(
            'UPDATE comments SET comment_id = $1, rate = $2, detail_comment = $3, approvalstatus = $4, user_id = $5, movie_id = $6 WHERE comment_id = $7 RETURNING *',
            [comment_id, rate, detail_comment, approvalstatus, user_id, movie_id, id]
        );
        return res.rows[0];
    },
    delete: async (id) => {
        const res = await pool.query('DELETE FROM comments WHERE comment_id = $1', [id]);
        return res.rowCount;
    }
};