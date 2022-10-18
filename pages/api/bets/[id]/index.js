import { Bet } from "../../../../server/db";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const bet = await Bet.findByPk(id);
      res.send(bet);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  if (req.method === "PUT") {
    try {
      const bet = await Bet.findByPk(id);
      bet.update(req.body);
      res.json(bet);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
