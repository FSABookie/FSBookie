import { Post, Comment } from "../../../server/db";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const post = await Post.findOne({
        where: {
            id: id,
        },
        include: Comment
      });
      console.log(post)
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    }

if (req.method === 'DELETE') {
    try {
        //findOne allows us to specify by id or where we should look for something
        //findbyPk is quicker because it will take just one parameter the id
        const post = await Post.findByPk(id);
        post.destroy();
        res.status(204).json()
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

if (req.method === 'PUT') {
    try {
        const post = await Post.findByPk(id);
        post.update(req.body);
        res.json(post);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}
}

