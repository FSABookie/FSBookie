import { Parlay } from "../../server/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const parlay = await Parlay.create(req.body);
      res.status(201).json(parlay);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
