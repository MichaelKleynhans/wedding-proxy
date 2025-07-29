const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Allow CORS from your GitHub Pages frontend
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://michaelkleynhans.github.io',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.post('/rsvp', async (req, res) => {
  try {
    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!appsScriptUrl) throw new Error('GOOGLE_APPS_SCRIPT_URL not set');
    
    const response = await axios.post(appsScriptUrl, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error submitting RSVP:', error.message);
    res.status(500).json({ error: 'Failed to submit RSVP', details: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
