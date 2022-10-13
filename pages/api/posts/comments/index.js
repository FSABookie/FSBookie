import { Comment } from "../../../server/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const comments = await Comment.findAll();
      res.json(comments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const comment = await Comment.create(req.body);
      res.status(201).json(comment);
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}