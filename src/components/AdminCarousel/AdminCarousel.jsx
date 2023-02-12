import styles from './AdminCarousel.module.css';
import { useState, useEffect } from 'react';
import { upload } from '@/services/imageUpload';
import { fetchAPI } from '@/lib/fetchAPI';

export default function AdminCarousel ({carouselImages}) {

    const [image, setImage] = useState();
    const [imageSrc, setImageSrc] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [carouselItem, setCarouselItem] = useState();

    useEffect(() => {
        setCarouselItem(carouselImages)
    }, [carouselImages])

    useEffect(() => {
        const insertData = async () => {
            if (imageUrl) {
                await insertImage();
            }
        }
        insertData();
    }, [imageUrl])

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

    async function submitEvent(e) {
        e.preventDefault();
        if (image){
            try {
                const url = await upload(image);
                setImageUrl(url);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Nenhuma imagem selecionada');
        }
    }

    function cancelEvent(e) {
        e.preventDefault();
        setImage();
        setImageSrc();
    }

    async function insertImage() {
        fetchAPI(`api/carouselImages/insert`, {
            url: imageUrl
        }).catch((err) => {
            console.error(err);
        })
    }

    async function deleteImageCloudinary(publicId) {
        fetchAPI(`api/cloudinaryAPI/cloudinaryDelete`, {
            public_id: publicId
        }).catch((err) => {
            console.error(err);
        })
    }

    async function deleteImage(id, publicId) {
        if (confirm('Você deseja deletar essa foto?')){
            fetchAPI(`api/carouselImages/delete`, {
                id: id
            }).catch((err) => {
                console.error(err);
            })
            await deleteImageCloudinary(publicId);
            window.location.reload();
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <h1>Carrosel</h1>
            <div className={styles.carouselItems}>
                {carouselItem && carouselItem.map((product, index) => {
                    const publicId = [`wooden-images/${product.url.split('wooden-images/')[1].split('.')[0]}`];
                    return(
                        <div key={index} className={styles.carouselItem}>
                            <div className={styles.carouselItemImg}>
                                <img src={product.url} style={{height: '10vh', width: 'auto'}}></img>
                            </div>
                            <div className={styles.formButtons}>
                                <div className={styles.cancelButton} onClick={() => deleteImage(product._id, publicId)}><i className="fa-solid fa-trash"></i></div>
                            </div>
                        </div>  
                    )
                })}
            </div>
            <div className={styles.carouselAdd}>
                <div className={styles.carouselFileInput}>
                    <div className={styles.formFileInput}>
                        <form style={!image ? {width: '160px', height: '100px', display: 'flex', alignItems: 'center'} : {width: 'auto', height: 'auto'}}>
                            {!image ? <label htmlFor="file-uploader">Selecione a imagem</label> : <img src={imageSrc} style={{height: '140px', width: 'auto'}} onClick={() => document.getElementById("file-uploader").click()} />}
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