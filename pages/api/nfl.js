// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    let response = await fetch("https://jsonodds.com/api/odds/nfl", {
      headers: {
        "x-api-key": process.env.APIKEY,
      },
    });
    console.log(response);
    response = await response.json();
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
}
