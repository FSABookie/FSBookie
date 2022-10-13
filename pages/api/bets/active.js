import { Bet } from "../../../server/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log(req.body);
      const bets = await Bet.findAll({
        where: {
            isActive: true,
        }
      });
      res.status(200).json(bets);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}