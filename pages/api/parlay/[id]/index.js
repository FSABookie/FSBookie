import { Parlay } from "../../../../server/db";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "PUT") {
    try {
      const parlay = await Parlay.findByPk(id);
      parlay.update(req.body);
      res.json(parlay);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
