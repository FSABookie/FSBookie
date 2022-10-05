// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, Order, Bet } from "../../../server/db";


export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const user = await User.findOne({
        where: {
            id: id,
        },
        include: [
            {
                model: Order,
                include: [
                    {
                        model: Bet,
                    }
                ]
            }
        ]
      });
      console.log(user)
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  //TODO: FIND STATUS CODE & CHECK REQ.PARAMS || REQ.BODY || SEND UPDATED
  if (req.method === 'DELETE') {
    try {
      const user = await User.findByPk(id);
      user.destroy();
      res.status(204).json(user);
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  if (req.method === 'PUT') {
    try {
      const user = await User.findByPk(id);
      user.update(req.body);
      res.json(user);
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
