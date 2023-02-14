async function upload(image, folder='wooden-images'){
    console.log('uploading image')
    const formdata = new FormData();
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
    console.log(apiKey)
    formdata.append("file", image);
    formdata.append("upload_preset", folder);
    formdata.append("api_key", apiKey);
    formdata.append("quality", 'f_auto');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formdata
    });
    const result = await response.json();
    return result.secure_url;
};

export {upload};