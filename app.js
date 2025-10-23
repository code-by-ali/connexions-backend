const express = require("express");
const cors = require("cors");
const emailRoutes = require("./routes/email");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/email", emailRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running. Access the API at /api/properties");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
