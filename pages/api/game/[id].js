export default async function handler(req, res) {
  try {
    const { id } = req.query;
    let response = await fetch(
      `https://jsonodds.com/api/results/getbyeventid/${id}`,
      {
        headers: {
          "x-api-key": process.env.APIKEY,
        },
      }
    );
    response = await response.json();
    res.status(200).json(response);
  } catch (error) {
    throw new Error(error);
  }
}
