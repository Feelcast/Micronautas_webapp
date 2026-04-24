const express = require('express');
const app = express();

// A simple route
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Vercel!' });
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'Online and running perfectly.' });
});

// CRITICAL: Export the app for Vercel's serverless environment
module.exports = app;

// Allow local development
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}