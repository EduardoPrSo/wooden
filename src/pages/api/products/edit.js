import { connectToDatabase } from "@/utils/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req, res){
    try {
        const { method, body } = req;

        if (method === 'POST') {
            const { db } = await connectToDatabase();
            console.log(body.id)
            await db.collection('products').updateOne({_id: new ObjectId(body.id)},{
                $set: {
                    title: body.data.title,
                    description: body.data.description,
                    cathegory: body.data.cathegory,
                    term: body.data.term,
                    material: body.data.material,
                    on_main_page: body.data.on_main_page,
                }
            })
            res.status(200).json({ message: 'Success' });
        } else {
            res.status(400).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};