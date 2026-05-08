const express = require("express");
const axios = require("axios");
const router = express.Router();

// TMDB Proxy
router.get("/tmdb/*", async (req, res) => {
  try {
    // Extract the path after /proxy/tmdb/
    const tmdbPath = req.params[0];
    const tmdbUrl = `https://api.themoviedb.org/3/${tmdbPath}`;

    // Express parses ?lang=en&lang=en into an array. Clean it up so Axios doesn't send lang[]=en.
    const cleanQuery = {};
    for (const key in req.query) {
      if (Array.isArray(req.query[key])) {
        cleanQuery[key] = req.query[key][0]; // take the first value
      } else {
        cleanQuery[key] = req.query[key];
      }
    }

    // Forward cleaned query params, but attach the API key from env
    const params = {
      ...cleanQuery,
      api_key: process.env.TMDB_API_KEY,
    };

    const response = await axios.get(tmdbUrl, { params });
    res.json(response.data);
  } catch (error) {
    console.error("TMDB Proxy Error:", error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: "TMDB Proxy Error" });
  }
});

// OMDB Proxy
router.get("/omdb", async (req, res) => {
  try {
    const params = {
      ...req.query,
      apikey: process.env.OMDB_API_KEY,
    };

    const response = await axios.get("https://www.omdbapi.com/", { params });
    res.json(response.data);
  } catch (error) {
    console.error("OMDB Proxy Error:", error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: "OMDB Proxy Error" });
  }
});

module.exports = router;
