import { connectToDatabase } from "@/utils/mongodb";

export default async function hendler(req, res){
    try {
        const { method, body } = req;

        if (method === 'POST') {
            const { db } = await connectToDatabase();
            const data = await db.collection('products').findOne({product_id: body.id}).toArray() 
            res.status(200).json(data);
        } else {
            res.status(400).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error)
    }
};