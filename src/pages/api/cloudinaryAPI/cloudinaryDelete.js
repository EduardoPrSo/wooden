import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
});

export default async function hendler(req, res){
    try {
        const { method, body } = req;

        if (method === 'POST') {
            cloudinary.v2.api.delete_resources(body.public_id, {type : 'upload', resource_type : 'image'});
            res.status(200).json({ message: 'Success' });
        } else {
            res.status(400).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};