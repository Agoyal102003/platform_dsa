// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users'); // User routes
const problemRoutes = require('./routes/problems'); // Problem routes
const codeEditorRoutes = require('./routes/codeEditor');
const postRoutes = require('./routes/post');
const dataStructureRoutes = require('./routes/dataStructureRoutes');
const algorithmRoutes = require('./routes/algorithmRoutes');
const leaderboardRoutes = require('./routes/leaderboard'); 
const authMiddleware = require('./middleware/auth'); // JWT auth middleware
const errorHandler = require('./middleware/errorHandler'); // Centralized error handler


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://2021ceb1012:DPFObHi7rl7bYZrh@cluster0.cgsx649.mongodb.net/';
mongoose.connect(mongoURI, {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  

  app.use('/uploads', express.static('uploads'));
// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/problems', authMiddleware, problemRoutes); // Protected routes for problems
app.use('/code-editor', codeEditorRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', leaderboardRoutes); // Use leaderboard routes
app.use(dataStructureRoutes);
app.use(algorithmRoutes);


// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
