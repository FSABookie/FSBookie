// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, User } from "../../../server/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await User.findAll({
        include: Order
      });
      console.log(users)
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      const user = await User.create(req.body);
      res.status(201).json(user);
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
