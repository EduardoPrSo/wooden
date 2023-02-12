const fetchAPI = async(url, data) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (data){
        console.log(data)
        const response = await fetch(`${baseUrl}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } else {
        const response = await fetch(`${baseUrl}/${url}`);
        return response.json();
    }
};

export { fetchAPI };