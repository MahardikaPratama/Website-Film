const express = require('express');
const cors = require('cors');
const movieRoutes = require('./app/routes/movieRoutes');
const actorRoutes = require('./app/routes/actorRoutes');
const userRoutes = require('./app/routes/userRoutes');
const awardRoutes = require('./app/routes/awardRoutes');
const commentRoutes = require('./app/routes/commentRoutes');
const countryRoutes = require('./app/routes/countryRoutes');
const genreRoutes = require('./app/routes/genreRoutes');
const platformRoutes = require('./app/routes/platformRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json()); // Gantikan body-parser

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/actors', actorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/platforms', platformRoutes);

// Server listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
