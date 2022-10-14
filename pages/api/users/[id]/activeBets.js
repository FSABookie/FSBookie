import { User, Order, Bet } from "../../../../server/db";

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
            where: {
              isActive: true,
            },
            include: [
              {
                model: Bet,
                where: {
                  isActive: true,
                },
              },
            ],
          },
        ],
      });
      console.log(user);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
