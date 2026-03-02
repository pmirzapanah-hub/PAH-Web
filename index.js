import path from "path";
import express from "express";

const app = express();
app.use(express.json());

// =============================
// API routes go here
// =============================


// Serve frontend
const __dirname = path.resolve();
const clientPath = path.join(__dirname, "../public");

app.use(express.static(clientPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});