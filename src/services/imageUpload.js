async function upload(image, folder='wooden-images'){
    const formdata = new FormData();
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

    formdata.append("file", image);
    formdata.append("upload_preset", folder);
    formdata.append("api_key", apiKey);

    const data = await fetch(`https://api.cloudinary.com/v1_1/${folder}/image/upload`, {
        method: "POST",
        body: formdata
    }).then(r => r.json()).catch(err => console.log(err));
    console.log(data.secure_url);
    return data.secure_url;
};

export {upload};