// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '../../../server/db';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            const deposit = {balance: user.balance + req.body.deposit};
            user.update(deposit);
            res.json(user);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
