import { connectToDatabase } from "@/utils/mongodb";

export default async function hendler(req, res){
    try {
        const { method, body } = req;

        if (method === 'POST') {
            const { db } = await connectToDatabase();
            await db.collection('carousel_images').insertOne({url: body.url})
            res.status(200).json({ message: 'Success' });
        } else {
            res.status(400).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};