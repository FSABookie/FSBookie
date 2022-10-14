import { Post, Comment } from "../../../server/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const posts = await Post.findAll({
        include: [
          { 
          model: Comment, 
          include: [
            {
            model: Comment,
          }
        ] 
        }
      ]
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
}

  