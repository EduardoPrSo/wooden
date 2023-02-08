async function upload(image, folder='wooden-images'){
    const formdata = new FormData();
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

    formdata.append("file", image);
    formdata.append("upload_preset", folder);
    formdata.append("api_key", apiKey);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${folder}/image/upload`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.secure_url;
    } catch (error) {
        console.error(error);
    }
};

export {upload};