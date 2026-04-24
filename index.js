const express = require('express');
const path = require('path');
const app = express();

// 1. Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// 2. Define your API routes
app.get('/api/status', (req, res) => {
    res.json({ status: 'API is running perfectly.' });
});

// 3. Catch-all route (Send all other requests to your frontend)
// The Express v5 way
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// CRITICAL: Export the app for Vercel
module.exports = app;

// Allow local development
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}