import { Order, Bet } from "../../server/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
