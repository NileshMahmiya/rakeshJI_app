



const citySeach = async (req, res)=>{
    try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "City name is required",
      });
    }

    const url =
      `https://api.geoapify.com/v1/geocode/autocomplete` +
      `?text=${encodeURIComponent(query)}` +
      `&limit=5` +
      `&format=json` +
      `&apiKey=${process.env.GEOAPIFY_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Geoapify request failed");
    }

   const data = await response.json();

   const cityData = data
    

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("Location search error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search location",
    });
  }
}

export default citySeach