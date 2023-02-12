import { connectToDatabase } from "@/utils/mongodb";

export default async function handler(req, res){
    try {
        const { method, body } = req;

        if (method === 'POST') {
            const { db } = await connectToDatabase();
            await db.collection('products').insertOne({
                title: body.title,
                description: body.description,
                cathegory: body.cathegory,
                term: body.term,
                material: body.material,
                images: body.images,
                on_main_page: body.on_main_page
            })
            res.status(200).json({ message: 'Success' });
        } else {
            res.status(400).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error)
    }
};