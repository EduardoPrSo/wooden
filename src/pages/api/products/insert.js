import { connectToDatabase } from "@/utils/mongodb";

export default async function hendler(req, res){
    try {
        const { method } = req;

        if (method === 'POST') {
            const { db } = await connectToDatabase();
            await db.collection('products').insertOne({
                product_id: body.id,
                title: body.title,
                description: body.description,
                cathegory: body.cathegory,
                term: body.term,
                material: body.material,
                imaes: body.imaes,
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