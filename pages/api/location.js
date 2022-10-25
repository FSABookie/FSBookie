// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");
export default async function handler(req, res) {
  try {
    let data = await axios.get(
      "https://geocodeapi.p.rapidapi.com/GetNearestCities",
      {
        params: req.body,
        headers: {
          "X-RapidAPI-Key":
            "3e497b95f0msh1807eaa42b91679p1b4d17jsn0a634cf663ec",
          "X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
        },
      }
    );
    res.status(200).json(data);

    // let city = data.TimeZoneId.split("/")[1].replace("_", " ");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
}
