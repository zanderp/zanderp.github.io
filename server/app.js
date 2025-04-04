const express = require('express');
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');
const cookieRoutes = require('./routes/cookieRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/cookie-policy', cookieRoutes);

// Serve static files from React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;