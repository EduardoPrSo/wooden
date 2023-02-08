import styles from './AdminProducts.module.css';
import { upload } from '@/services/imageUpload';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function AdminProducts () {

    const [productImages, setProductImages] = useState([]);
    const [productImagesSrc, setProductImagesSrc] = useState([]);
    const [productImagesUrl, setProductImagesUrl] = useState();
    const [productCarouselItem, setProductCarouselItem] = useState();

    function handleImage(e) {
        const reader = new FileReader();

        reader.onload = (onLoadEvent) => {
            setProductImagesSrc(e.target.files);
            for (var item in e.target.files) {
                console.log(e.target.files[item]);
            }
            // setImage(e.target.files[0]);
        }
        try{
            reader.readAsDataURL(e.target.files[0]);
        } catch (err) {
            reader.readAsDataURL(image);
        }
    }

    return (
        <div className={styles.productsContainer}>
            <h1>Produtos</h1>
            <div className={styles.productsItems}>

            </div>
            <div className={styles.carouselAdd}>
                <form action="" encType="multipart/form-data">
                    <input type="file" id='product-image-uploader' style={{display: 'none'}} multiple onChange={handleImage}/>
                    <Carousel className={styles.carouselProductsAddArea} showStatus={false} showArrows={true} autoPlay={false} showThumbs={false}>
                        {<div className={styles.uploadImageBox}><label className={styles.uploadImageText} onClick={() => document.getElementById("product-image-uploader").click()}>Selecione a imagem</label></div>}
                    </Carousel>
                    <div className={styles.centerProductsAddArea}>
                        <input type="text" name="title" placeholder="Título Principal"/>
                        <textarea name="description" style={{resize: 'none'}} placeholder="Descrição"></textarea>
                    </div>
                    <div className={styles.centerProductsAddArea}>
                        <input type="text" name="cathegory" placeholder="Categoria"/>
                        <input type="text" name="term" placeholder="Prazo"/>
                        <input type="text" name="material" placeholder="Material"/>
                    </div>
                    <div className={styles.formButtons}>
                        <div className={styles.submitButton}><i className="fa-solid fa-upload"></i></div>
                        <div className={styles.cancelButton}><i className="fa-solid fa-xmark"></i></div>
                    </div>
                </form>
            </div>
        </div>
    )
}