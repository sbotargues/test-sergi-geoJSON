import express, { Request, Response } from 'express';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import { parseString } from 'xml2js';

const app = express();
app.get('/geojson', async (req: Request, res: Response) => {
    const { left, bottom, right, top } = req.query;
    
    // Validate parameters
    if(!left || !bottom || !right || !top) {
        return res.status(400).send({error: 'All bounding box parameters are required: left, bottom, right, top'});
    }

    try {
      const url = `https://www.openstreetmap.org/api/0.6/map?bbox=${left},${bottom},${right},${top}`;
      const osmResponse = await axios.get(url);
      console.log(osmResponse.data);
      
      // Check if the data is JSON
      if (osmResponse.data[0] === '{' || osmResponse.data[0] === '[') {
          let error;
          try {
              // Parse the data as JSON
              error = JSON.parse(osmResponse.data);
          } catch (e) {
              // If the data is not valid JSON, log the error and send a response
              console.error(e);
              return res.status(500).send({error: 'OSM returned invalid JSON'});
          }
          // Log the error returned by OSM and send a response
          console.error(error);
          return res.status(500).send({error: 'Error from OSM', details: error});
      }
      
      // If the data is not JSON, proceed as before
      parseString(osmResponse.data, (err, result) => {
          // rest of the code
            if(err) {
                console.error(err); // Log the error
                return res.status(500).send({error: 'Error parsing OSM data'});
            }
            try {
                const geojson = osmtogeojson(result);
                return res.send(geojson);
            } catch (error) {
                console.error(error); // Log the error
                return res.status(500).send({error: 'Error converting data to GeoJSON'});
            }
        });
    } catch (error) {
        console.error(error); // Log the error
        return res.status(500).send({error: 'Error fetching data from OSM'});
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
