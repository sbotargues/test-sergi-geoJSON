// index.ts

import express from 'express';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';

const app = express();
const port = 3000;

app.get('/geojson', async (req, res) => {
    const { minLat, minLon, maxLat, maxLon } = req.query;
    
    if (!minLat || !minLon || !maxLat || !maxLon) {
        res.status(400).send({ error: 'Debes proporcionar minLat, minLon, maxLat y maxLon' });
        return;
    }

    try {
        const { data } = await axios.get(`https://www.openstreetmap.org/api/0.6/map?bbox=${minLon},${minLat},${maxLon},${maxLat}`);
        const geojsonData = osmtogeojson(data);

        res.send(geojsonData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Hubo un problema al obtener los datos de OpenStreetMap' });
    }
});

app.listen(port, () => {
    console.log(`App está corriendo en http://localhost:${port}`);
});
