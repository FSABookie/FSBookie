import { Comment } from "../../../server/db";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const comment = await Comment.findOne({
        where: {
            id: id,
        },
      });
      console.log(comment)
      res.json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    }

if (req.method === 'DELETE') {
    try {
        //findOne allows us to specify by id or where we should look for something
        //findbyPk is quicker because it will take just one parameter the id
        const comment = await Comment.findByPk(id);
        comment.destroy();
        res.status(204).json()
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

if (req.method === 'PUT') {
    try {
        const comment = await Comment.findByPk(id);
        comment.update(req.body);
        res.json(comment);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}
}