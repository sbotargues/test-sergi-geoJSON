import express, { Request, Response } from "express";
import axios from "axios";
import osmtogeojson from "osmtogeojson";
import { parseString } from "xml2js";

const app = express();
app.get("/geojson", async (req: Request, res: Response) => {
  const { left, bottom, right, top } = req.query;

  // Validate parameters
  if (!left || !bottom || !right || !top) {
    return res
      .status(400)
      .send({
        error:
          "All bounding box parameters are required: left, bottom, right, top",
      });
  }

  try {
    const url = `https://www.openstreetmap.org/api/0.6/map?bbox=${left},${bottom},${right},${top}`;
    const osmResponse = await axios.get(url);

    parseString(osmResponse.data, (err, result) => {
      if (err) {
        return res.status(500).send({ error: "Error parsing OSM data" });
      }

      const geojson = osmtogeojson(result);
      return res.send(geojson);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error fetching data from OSM" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
