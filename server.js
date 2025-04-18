const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors({
  origin: ['*', 'https://deploy-preview-54--icommitai.netlify.app','https://www.icommit.ai'],// Add both your production and preview URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
