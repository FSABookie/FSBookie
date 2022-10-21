import { Post, Comment } from "../../../../server/db";

export default async function handler(req, res) {
    const { id } = req.query;
  if (req.method === "GET") {
    try {
      const posts = await Post.findOne({
        where: {
            id: id
        },
        include: [
          {
            model: Comment,
            include: [
              {
                model: Comment,
              },
            ],
          },
        ],
      });
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const post = await Post.create(req.body);
      res.status(201).json(post);
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  if (req.method === "PUT") {
    const { id } = req.query;
    try {
      const post = await Post.findOne({
        where: {
        id: id
      },
    });
      post.update(req.body);
      res.status(201).json(post);
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}



  