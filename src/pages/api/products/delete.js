import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req, res){
    try {
        const { method, body } = req;

        if (method === 'POST') {
            const { db } = await connectToDatabase();
            console.log(body.id)
            await db.collection('products').deleteOne({_id: new ObjectId(body.id)})
            res.status(200).json({ message: 'Success' });
        } else {
            res.status(400).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};