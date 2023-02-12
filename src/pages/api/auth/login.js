import { connectToDatabase } from "@/utils/mongodb";

export default async function hendler(req, res){
    try {
        const { method, body } = req;

        if (method === 'POST') {
            const { db } = await connectToDatabase();
            const session = await db.collection('admin_account').findOne();
            if (session.user === body.username && session.pass === body.password){
                res.status(200).json({ message: 'success' });
            } else{
                res.status(401).json({ message: 'User not allowed' });
            }
        } else {
            res.status(400).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};