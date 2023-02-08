import styles from './AdminCarousel.module.css';
import { upload } from '@/services/imageUpload';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminCarousel ({carouselImages}) {

    const [image, setImage] = useState();
    const [imageSrc, setImageSrc] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [carouselItem, setCarouselItem] = useState();

    useEffect(() => {
        if (carouselImages) {
            setCarouselItem(carouselImages.map((product, index) => {
                return(
                    <div key={index} className={styles.carouselItem}>
                        <div className={styles.carouselItemImg}>
                            <img src={product.url} style={{height: '10vh', width: 'auto'}}></img>
                        </div>
                        <div className={styles.formButtons}>
                            <div className={styles.cancelButton} onClick={() => deleteImage(product._id)}><i className="fa-solid fa-trash"></i></div>
                        </div>
                    </div>  
                )
            }))
        }
    }, [carouselImages])

    useEffect(() => {
        const insertData = async () => {
            if (imageUrl) {
                await insertImage();
            }
        }
        insertData();
    }, [imageUrl])

    async function submitEvent() {
        if (image){
            const url = await upload(image);
            setImageUrl(url);
            window.location.reload();
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

    async function deleteImage(id) {
        try {
            const response = await axios.post('api/carousel_images/delete', {
                _id: id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.reload();
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <h1>Carrosel</h1>
            <div className={styles.carouselItems}>
                {carouselItem}
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
    )
}