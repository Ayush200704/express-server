const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// The Flask API endpoint
const flaskUrl = 'https://web-production-5d37.up.railway.app/predict';

app.post('/predict', async (req, res) => {
    const inputData = req.body.input;

    // Validate input data
    if (!Array.isArray(inputData) || !Array.isArray(inputData[0])) {
        return res.status(400).json({ error: 'Invalid input format' });
    }

    try {
        // Send input data to the Flask server
        const response = await axios.post(flaskUrl, { input: inputData });

        // Send the response back to the client
        res.json(response.data);

    } catch (err) {
        console.error('Flask API Error:', err);
        res.status(500).json({ error: 'An error occurred while processing the request', details: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});
