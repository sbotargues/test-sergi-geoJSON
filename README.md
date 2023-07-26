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

3. Additional error checks I added:

- Check if parameters are valid numbers: To ensure that all inputs are valid numbers, the code converts each of the four bounding box parameters (minLat, minLon, maxLat, maxLon) to a Number type. Then it checks if any of them are NaN (Not a Number) using the isNaN function. If any of them are not valid numbers, the code sends an HTTP 400 response to the client with an appropriate error message.

- Check if parameters are in a valid range: After confirming that all inputs are valid numbers, the code checks if these numbers are within valid ranges. For latitudes (minLat, maxLat), the valid range is from -90 to 90. For longitudes (minLon, maxLon), the valid range is from -180 to 180. If any of the parameters are out of range, the code sends an HTTP 400 response to the client with an appropriate error message.

- Handle errors during data conversion: In the process of converting data from OSM format to GeoJSON format, errors can occur. This is now handled in a separate try-catch block. If an error occurs during data conversion, the code logs the error and sends an HTTP 500 response to the client with an appropriate error message.