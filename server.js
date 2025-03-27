const express = require("express");
const app = express();
const port = 5500;

// Serve static files from the frontend/public directory
app.use(express.static("frontend/public"));

// Route for serving the main HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/public/index.html");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
