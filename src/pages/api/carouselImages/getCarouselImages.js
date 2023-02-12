import { connectToDatabase } from "@/utils/mongodb";

export default async function hendler(req, res){
    try {
        const { method } = req;

        if (method === 'GET') {
            console.log(new Date().toISOString(), 'GET /api/carouselImages - start');
            const { db } = await connectToDatabase();
            console.log(new Date().toISOString(), 'GET /api/carouselImages - connected to db');
            const data = await db.collection('carousel_images').find().toArray()
            console.log(new Date().toISOString(), 'GET /api/carouselImages - data fetched');
            res.status(200).json(data);
        } else {
            res.status(400).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error)
    }
};