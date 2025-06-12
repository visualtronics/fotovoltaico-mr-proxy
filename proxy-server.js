import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 10000;

// Add this CORS middleware *before* your routes
app.use((req, res, next) => {
  // Set the allowed origin. Replace with '*' to allow any origin (less secure)
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Set the allowed headers for preflight requests
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin');

  // Set the allowed methods for preflight requests
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Include the methods your client uses

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200); // Respond to preflight request
  } else {
    next(); // Continue to the next middleware or route handler
  }
});

app.get('/api/dati', async (req, res) => {
    try {
        console.log('Received request for /api/dati');
        const response = await fetch('https://www.monitoraggioimpianti.it/solarnet/liveDataShort3.ashx');
        const data = await response.json();
        console.log('Response data:', JSON.stringify(data, null, 2))
        console.log(`response: ${response}`);

        // Log response details
        console.log({
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers),
            type: response.type,
            url: response.url,
            redirected: response.redirected,
            ok: response.ok
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(`error: ${error}`);
    }
});

app.listen(port, () => console.log('Proxy server running on port 10000'));