import styles from './AdminPage.module.css';
import { upload } from '@/services/imageUpload';
import { useState, useEffect } from 'react';
import clientPromise from '@/utils/mongodb';

export default function AdminPage (props) {

    const [image, setImage] = useState();
    const [imageSrc, setImageSrc] = useState();
    const [imageUrl, setImageUrl] = useState();

    console.log(props)

    useEffect(() => {
        const insertData = async () => {
            if (imageUrl) {
                await insertImage();
            }
        }
        insertData();
    }, [imageUrl])

    async function submitEvent(e) {
        e.preventDefault();
        if (image){
            const url = await upload(image);
            setImageUrl(url);
        } else {
            alert('Nenhuma imagem selecionada');
        }
    }

    function cancelEvent(e) {
        e.preventDefault();
        setImage();
        setImageSrc();
    }

    function handleImage(e) {
        const reader = new FileReader();

        reader.onload = (onLoadEvent) => {
            setImageSrc(onLoadEvent.target.result)
            setImage(e.target.files[0]);
        }
        try{
            reader.readAsDataURL(e.target.files[0]);
        } catch (err) {
            reader.readAsDataURL(image);
        }
    }

    async function insertImage() {
        try {
            const response = await axios.post('api/carousel_images/insert', {
                url: imageUrl
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    // async function deleteImage() {
    //     try {
    //         const response = await axios.post('api/carousel_images/delete', {
    //             _id: imageId
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         return response;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.carouselContainer}>
                <h1>Carrosel</h1>
                <div className={styles.carouselItems}>
                    <div className={styles.carouselItem}>
                        <div className={styles.carouselItemImg}>
                            <img src='https://assets.website-files.com/5c281a6a77f28357629f48ce/5c2e9ed9c370807d384b20e8_banner-sale%20(3).jpg' style={{height: '10vh', width: 'auto'}}></img>
                        </div>
                        <div className={styles.formButtons}>
                            <div className={styles.cancelButton}><i className="fa-solid fa-trash"></i></div>
                        </div>
                    </div>   
                </div>
                <div className={styles.carouselAdd}>
                    <div className={styles.carouselFileInput}>
                        <div className={styles.formFileInput}>
                            <form style={!image ? {width: '8vw', height: '10vh'} : {width: 'auto', height: '10vh'}}>
                                {!image ? <label htmlFor="file-uploader">Selecione a imagem</label> : <img src={imageSrc} style={{height: '10vh', width: 'auto'}}  onClick={() => document.getElementById("file-uploader").click()} />}
                                <input type="file" id='file-uploader' style={{display: 'none'}} onChange={handleImage}/>
                            </form>
                        </div>
                        <div className={styles.formButtons}>
                            <div className={styles.submitButton} onClick={submitEvent}><i className="fa-solid fa-upload"></i></div>
                            <div className={styles.cancelButton} onClick={cancelEvent}><i className="fa-solid fa-xmark"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.productsContainer}>
                <h1>Produtos</h1>
            </div>
        </div>
    )
}

export const getServerSideProps = async () => {
    const data = await getCarouselImages()

    return {
        props: {
            data
        }
    }
}