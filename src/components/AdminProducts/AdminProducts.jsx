import styles from './AdminProducts.module.css';
import { useState, useEffect } from 'react';
import { upload } from '@/services/imageUpload';
import axios from 'axios';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function AdminProducts ({products}) {

    const [productImages, setProductImages] = useState([]);
    const [productImagesSrc, setProductImagesSrc] = useState([]);
    const [productImagesCarousel, setProductImagesCarousel] = useState();
    const [productImagesUrl, setProductImagesUrl] = useState([]);
    const [productItem, setProductItem] = useState();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (products) {
            setProductItem(products.map((product, index) => {
                const publicId = product.images.map((image, index) => {
                    return `wooden-images/${image.split('wooden-images/')[1].split('.')[0]}`;
                });
                console.log(publicId)
                const CarouselItems = product.images.map((image, index) => (
                    <div key={index} style={{height: '100%', width: 'auto'}}>
                        <img src={image} style={{height: '10vh', width: 'auto'}}/>
                    </div>
                ));
                return(
                    <div key={index} className={styles.carouselItem}>
                        <form>
                            <Carousel className={styles.carouselProductsAddArea} showStatus={false} showArrows={true} autoPlay={false} showThumbs={false} style={!productImagesCarousel ? {width: '160px', height: '100px', display: 'flex', alignItems: 'center'} : {width: 'auto', height: 'auto'}}>
                                {CarouselItems}
                            </Carousel>
                            <div className={styles.centerProductsAddArea}>
                                <p style={{color: '#fc8f00'}}>Título: </p>
                                <p style={{fontSize: 'small', marginBottom: '5px'}}>{product.title}</p>
                                <p style={{color: '#fc8f00'}}>Descrição: </p>
                                <p style={{fontSize: 'small'}}>{product.description}</p>
                            </div>
                            <div className={styles.centerProductsAddArea}>
                                <p style={{color: '#fc8f00'}}>Categoria: </p>
                                <p style={{fontSize: 'small', marginBottom: '5px'}}>{product.cathegory}</p>
                                <p style={{color: '#fc8f00'}}>Prazo: </p>
                                <p style={{fontSize: 'small'}}>{product.term}</p>
                            </div>
                            <div className={styles.centerProductsAddArea}>
                                <p style={{color: '#fc8f00'}}>Material: </p>
                                <p style={{fontSize: 'small', marginBottom: '5px'}}>{product.material}</p>
                                <p style={{color: '#fc8f00'}}>Página principal: </p>
                                <p style={{fontSize: 'small'}}>{product.on_main_page ? 'Sim' : 'Não'}</p>
                            </div>
                            <div className={styles.formButtons}>
                                <div className={styles.cancelButton} onClick={() => deleteImage(product._id, publicId)}><i className="fa-solid fa-trash"></i></div>
                            </div>
                        </form>
                    </div> 
                )
            }));
            setRefresh(!refresh);
        }
    }, [products, refresh])

    useEffect(() => {
        if (JSON.stringify(productImagesSrc) !== JSON.stringify([])) {
            const CarouselItems = productImagesSrc.map((image, index) => (
                <div key={index} className={styles.imagesDiv} onClick={() => document.getElementById("product-image-uploader").click()}>
                    <img src={image} style={{height: '10vh', width: 'auto'}}/>
                </div>
            ));
            setProductImagesCarousel(CarouselItems);
        }
    }, [productImagesSrc]);

    useEffect(() => {
        const insertData = async () => {
            if (JSON.stringify(productImages) !== JSON.stringify([])) {
                if (productImagesUrl.length === productImages.length) {
                    await insertImage();
                }
            }
        }
        insertData();
    }, [productImagesUrl])

    function handleImage(e) {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
        
            reader.onload = (onLoadEvent) => {
                setProductImagesSrc(prevState => [...prevState, onLoadEvent.target.result]);
                setProductImages(prevState => [...prevState, files[i]]);
            }
            reader.readAsDataURL(files[i]);
        }
    }

    async function submitEvent() {
        if (JSON.stringify(productImages) !== JSON.stringify([])){
            for (let image in productImages) {
                const url = await upload(productImages[image]);
                setProductImagesUrl(prevState => [...prevState, url]);
            }
            window.location.reload();
        } else {
            alert('Nenhuma imagem selecionada');
        }
    }

    function cancelEvent(e) {
        e.preventDefault();
        setProductImages([]);
        setProductImagesSrc([]);
        setProductImagesCarousel();
        setProductImagesUrl([]);
    }

    async function insertImage() {
        const formData = getInputs();
        try {
            const response = await axios.post('api/products/insert', {
                title: formData.title,
                description: formData.description,
                cathegory: formData.cathegory,
                term: formData.term,
                material: formData.material,
                images: productImagesUrl,
                on_main_page: formData.on_main_page
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    function getInputs(){
        const data = {
            title: document.querySelector('#titleProductInput').value,
            description: document.querySelector('#descriptionProductInput').value,
            cathegory: document.querySelector('#cathegoryProductInput').value,
            term: document.querySelector('#termProductInput').value,
            material: document.querySelector('#materialProductInput').value,
            on_main_page: document.querySelector('#onMainProductInput').checked
        }
        return data
    };

    async function deleteImage(id, publicId) {
        try {
            const response = await axios.post('api/products/delete', {
                _id: id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await deleteImageCloudinary(publicId)
            window.location.reload();
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    async function deleteImageCloudinary(publicId) {
        try {
            const response =  axios.post('api/cloudinaryAPI/cloudinaryDelete', {
                public_id: publicId
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
        <div className={styles.productsContainer}>
            <h1>Produtos</h1>
            <div className={styles.productsItems}>
                {productItem}
            </div>
            <div className={styles.carouselAdd}>
                <form action="" encType="multipart/form-data">
                    <input type="file" id='product-image-uploader' style={{display: 'none'}} multiple onChange={handleImage}/>
                    <Carousel className={styles.carouselProductsAddArea} showStatus={false} showArrows={true} autoPlay={false} showThumbs={false} style={!productImagesCarousel ? {width: '160px', height: '100px', display: 'flex', alignItems: 'center'} : {width: 'auto', height: 'auto'}}>
                        {!productImagesCarousel ? <div className={styles.uploadImageBox}><label className={styles.uploadImageText} onClick={() => document.getElementById("product-image-uploader").click()}>Selecione a imagem</label></div> : productImagesCarousel}
                    </Carousel>
                    <div className={styles.centerProductsAddArea}>
                        <input type="text" name="title" id="titleProductInput" placeholder="Título Principal"/>
                        <textarea name="description" id="descriptionProductInput" style={{resize: 'none'}} placeholder="Descrição"></textarea>
                    </div>
                    <div className={styles.centerProductsAddArea}>
                        <input type="text" name="cathegory" id="cathegoryProductInput" placeholder="Categoria"/>
                        <input type="text" name="term" id="termProductInput" placeholder="Prazo"/>
                        <input type="text" name="material" id="materialProductInput" placeholder="Material"/>
                        <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
                            <p style={{fontSize: 'small', width: '80%', color: 'grey'}}>Página Principal?</p>
                            <input style={{width: '10%'}} type="checkbox" name="onMain" id="onMainProductInput" />
                        </div>
                    </div>
                    <div className={styles.formButtons}>
                        <div className={styles.submitButton} onClick={submitEvent}><i className="fa-solid fa-upload"></i></div>
                        <div className={styles.cancelButton} onClick={cancelEvent}><i className="fa-solid fa-xmark"></i></div>
                    </div>
                </form>
            </div>
        </div>
    )
}