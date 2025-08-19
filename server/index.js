const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require('mongoose');
const mentorsRoutes = require('./routes/mentors');
const favoritesRouter = require('./routes/favorites');
const tipsRouter = require('./routes/tips');
const menteesRoutes = require('./routes/mentees');
const usersRoutes = require('./routes/users');
const myMenteesRouter = require('./routes/myMentees');
const myMentorRouter = require('./routes/myMentor');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.use("/api/mentors", mentorsRoutes);
app.use("/api/mentees", menteesRoutes);
app.use("/api/users", usersRoutes);
app.use('/api/favorites', favoritesRouter);
app.use('/api/myMentees', myMenteesRouter);
app.use('/api/tips', tipsRouter);
app.use('/api/myMentor', myMentorRouter);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));


// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    message: "QueenB Server is running!",
    timestamp: new Date().toISOString(),
    status: "healthy",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to QueenB API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
});
