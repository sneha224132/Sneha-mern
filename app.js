const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/books');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;