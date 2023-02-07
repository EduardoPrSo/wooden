import styles from './AdminPage.module.css';
import { upload } from '@/services/imageUpload';
import { useState } from 'react';

export default function AdminPage () {

    const [image, setImage] = useState(null);
    const [imageUrl, setimageUrl] = useState("");

    async function submitEvent(e) {
        e.preventDefault();
        setimageUrl(await upload(image));
    }

    return (
        <div className={styles.mainContainer}>
            <form action="" onSubmit={submitEvent}>
                <input type="file" name="" id="" onChange={(e) => setImage(e.target.files[0])}/>
                <button type="submit">Enviar</button>
            </form>
            <p>{imageUrl}</p>
        </div>
    )
}