import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 10000;

app.use(cors());

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

app.listen(port, () => console.log('Proxy server running on port 3000'));