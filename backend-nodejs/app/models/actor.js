const pool = require('../config/db');

const Actor = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM actors');
        return res.rows;
    },
    getById: async (id) => {
        const res = await pool.query('SELECT * FROM actors WHERE actor_id = $1', [id]);
        return res.rows[0];
    },
    create: async (data) => {
        const { actor_id, name, birth_date, foto  } = data;
        const res = await pool.query(
            'INSERT INTO actors (actor_id, name, birth_date, foto) VALUES ($1, $2, $3, $4) RETURNING *',
            [actor_id, name, birth_date, foto]
        );
        return res.rows[0];
    },
    update: async (id, data) => {
        const { actor_id, name, birth_date, foto } = data;
        const res = await pool.query(
            'UPDATE actors SET actor_id = $1, name = $2, birth_date = $3, foto = $4 WHERE actor_id = $5 RETURNING *',
            [actor_id, name, birth_date, foto, id]
        );
        return res.rows[0];
    },
    delete: async (id) => {
        const res = await pool.query('DELETE FROM actors WHERE actor_id = $1', [id]);
        return res.rowCount;
    }
};

module.exports = Actor;