import { Bet } from "../../server/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const bet = await Bet.create(req.body);
      res.status(201).json(bet);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
