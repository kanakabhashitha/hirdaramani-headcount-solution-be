import axios from "axios";

const getDirectionsCalculateData = async (req, res, next) => {
  try {
    const { origin, destination, mode, departure_time, key } = req.query;

    // Make a request to the Google Maps API
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin,
          destination,
          mode,
          departure_time,
          key,
        },
      }
    );

    const durationSeconds = response.data.routes[0].legs[0].duration.value;

    // Calculate hours and remaining minutes
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.round((durationSeconds % 3600) / 60);

    const distanceKm = response.data.routes[0].legs[0].distance.value / 1000;

    res.json({ hours, minutes, distanceKm });
  } catch (error) {
    next(error);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const { latitude, longitude, key } = req.query;

    // Make a request to the Google Maps API
    const addressResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`
    );

    const address =
      addressResponse.data.results[0]?.formatted_address || "Unknown Address";

    res.json(address);
  } catch (error) {
    next(error);
  }
};

export { getDirectionsCalculateData, getAddress };
