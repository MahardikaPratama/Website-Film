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
    getByMovie: async (movie_id) => {
        try {
            const res = await pool.query(`
                SELECT c.comment_id, c.movie_id, c.user_id, c.detail_comment, c.created_time, c.comment_rate, u.username
                FROM comments c
                JOIN users u ON c.user_id = u.user_id
                WHERE c.movie_id = $1
                AND c.approval_status = 'APPROVED'
                ORDER BY c.created_time DESC
            `, [movie_id]);
    
            return res.rows;
        } catch (error) {
            throw new Error('Failed to get comments by movie: ' + error.message);
        }
    },    
    create: async (data) => {
        const { comment_rate, detail_comment, user_id, movie_id } = data; // Hanya menerima parameter yang dibutuhkan
        try {
            const approval_status = 'APPROVED';
            await pool.query('CALL insert_comment($1, $2, $3, $4, $5)', [comment_rate, detail_comment, approval_status, user_id, movie_id]);
            const res = await pool.query('SELECT * FROM comments WHERE user_id = $1 AND movie_id = $2', [user_id, movie_id]);
            return res.rows[0];
        } catch (error) {
            throw new Error('Failed to create comment: ' + error.message);
        }
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

module.exports = Comment;