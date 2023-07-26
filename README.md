# GeoJSON Feature API - Sergi Botargues Test

This project is a simple RESTful API built with Express.js and TypeScript. It exposes a single endpoint that returns GeoJSON features for a given location, specified by a geolocation bounding box.

## Getting Started

### Installing and Running

Follow these steps to get the project set up on your local machine:

1. Clone this repository:


- git clone https://github.com/sbotargues/test-sergi-geoJSON.git

- cd test-sergi-geoJSON

- npm install

- npm run dev

2. Usage:

Once the server is running, you can use the /geojson endpoint to fetch GeoJSON data for a specific location. You'll need to provide a bounding box for the location in the query parameters.

Example usage:

- http://localhost:3000/geojson?minLat=37.7&minLon=-123.1&maxLat=37.8&maxLon=-122.9

Note: This will return GeoJSON features for the specified bounding box, which in this case represents a portion of San Francisco, CA, USA.