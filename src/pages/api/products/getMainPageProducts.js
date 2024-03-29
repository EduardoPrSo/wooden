import { connectToDatabase } from "@/utils/mongodb";

export default async function handler(req, res){
    try {
        const { method } = req;

        if (method === 'GET') {
            const { db } = await connectToDatabase();
            const data = await db.collection('products').find({on_main_page: true}).toArray() 
            res.status(200).json(data);
        } else {
            res.status(400).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error)
    }
};