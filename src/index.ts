// index.ts

import express from 'express';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';

const app = express();
const port = 3000;

app.get('/geojson', async (req, res) => {
    const { minLat, minLon, maxLat, maxLon } = req.query;
    
    // Check if all necessary parameters are provided
    if (!minLat || !minLon || !maxLat || !maxLon) {
        res.status(400).send({ error: 'You must provide minLat, minLon, maxLat and maxLon' });
        return;
    }

    try {
        // Fetch data from OpenStreetMap API
        const { data } = await axios.get(`https://www.openstreetmap.org/api/0.6/map?bbox=${minLon},${minLat},${maxLon},${maxLat}`);
        
        // Convert OSM data to GeoJSON
        const geojsonData = osmtogeojson(data);

        // Send the GeoJSON data as response
        res.send(geojsonData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'There was a problem fetching data from OpenStreetMap' });
    }
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
