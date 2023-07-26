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

    // Check if parameters are valid numbers and in valid range
    const latitudes = [minLat, maxLat].map(Number);
    const longitudes = [minLon, maxLon].map(Number);

    if (latitudes.some(isNaN) || longitudes.some(isNaN)) {
        res.status(400).send({ error: 'Parameters must be valid numbers' });
        return;
    }

    if (latitudes.some(lat => lat < -90 || lat > 90) || longitudes.some(lon => lon < -180 || lon > 180)) {
        res.status(400).send({ error: 'Parameters are out of valid range' });
        return;
    }

    try {
        // Fetch data from OpenStreetMap API
        const { data } = await axios.get(`https://api.openstreetmap.org/api/0.6/map?bbox=${minLon},${minLat},${maxLon},${maxLat}`);

        // Convert OSM data to GeoJSON
        let geojsonData;
        try {
            geojsonData = osmtogeojson(data);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'There was a problem converting data to GeoJSON' });
            return;
        }

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

