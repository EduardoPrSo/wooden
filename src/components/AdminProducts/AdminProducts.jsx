import styles from './AdminProducts.module.css';
import { useState, useEffect } from 'react';
import { upload } from '@/services/imageUpload';
import { fetchAPI } from '@/lib/fetchAPI';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function AdminProducts ({products}) {

    const [productImages, setProductImages] = useState([]);
    const [productImagesSrc, setProductImagesSrc] = useState([]);
    const [productImagesCarousel, setProductImagesCarousel] = useState();
    const [productImagesUrl, setProductImagesUrl] = useState([]);
    const [productItem, setProductItem] = useState();

    useEffect(() => {
        setProductItem(products)
    }, [products])

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
        fetchAPI(`api/products/insert`, {
            title: formData.title,
            description: formData.description,
            cathegory: formData.cathegory,
            term: formData.term,
            material: formData.material,
            images: productImagesUrl,
            on_main_page: formData.on_main_page
        }).catch((err) => {
            console.error(err);
        });
    };

    function getInputs(edit=false, product_id=null){
        const data = {
            title: document.querySelector(edit ? `#titleProductInputEdit-${product_id}` : '#titleProductInput').value,
            description: document.querySelector(edit ? `#descriptionProductInputEdit-${product_id}` : '#descriptionProductInput').value,
            cathegory: document.querySelector(edit ? `#cathegoryProductInputEdit-${product_id}` : '#cathegoryProductInput').value,
            term: document.querySelector(edit ? `#termProductInputEdit-${product_id}` : '#termProductInput').value,
            material: document.querySelector(edit ? `#materialProductInputEdit-${product_id}` : '#materialProductInput').value,
            on_main_page: document.querySelector(edit ? `#onMainProductInputEdit-${product_id}` : '#onMainProductInput').checked
        }
        return data
    };

    async function editProduct(product_id) {
        if (confirm('Você deseja editar esse produto?')){
            const data = getInputs(true, product_id);
            fetchAPI(`api/products/edit`, {
                id: product_id,
                data: data
            }).catch((err) => {
                console.error(err);
            });
            window.location.reload();
        }
    }

    async function deleteImageCloudinary(publicId) {
        fetchAPI(`api/cloudinaryAPI/cloudinaryDelete`, {
            public_id: publicId
        }).catch((err) => {
            console.error(err);
        });
    };

    async function deleteImage(id, publicId) {
        if (confirm('Você deseja deletar esse produto?')){
            fetchAPI(`api/products/delete`, {
                id: id
            }).catch((err) => {
                console.error(err);
            });
            await deleteImageCloudinary(publicId)
            window.location.reload();
        }
    };

    return (
        <div className={styles.productsContainer}>
            <h1>Produtos</h1>
            <div className={styles.productsItems}>
                {productItem && productItem.map((product, index) => {
                    const publicId = product.images.map((image) => {
                        return `wooden-images/${image.split('wooden-images/')[1].split('.')[0]}`;
                    });
                    const CarouselItems = product.images.map((image, index) => (
                        <div key={index} style={{height: '100%', width: 'auto', position: 'relative'}}>
                            <img src={image} style={{height: '10vh', width: 'auto'}}/>
                        </div>
                    ));
                    return(
                        <div key={index} className={styles.carouselItem}>
                            <form>
                                <div>
                                    <Carousel className={styles.carouselProductsAddArea} showDots={false} showStatus={false} showArrows={true} autoPlay={false} showThumbs={false} style={!productImagesCarousel ? {width: '160px', height: '100px', display: 'flex', alignItems: 'center'} : {width: 'auto', height: 'auto'}}>
                                        {CarouselItems}
                                    </Carousel>
                                </div>
                                <div className={styles.centerProductsArea}>
                                    <p style={{color: '#fc8f00'}}>Título: </p>
                                    <input id={`titleProductInputEdit-${product._id}`} type="text" style={{fontSize: 'small', marginBottom: '5px'}} defaultValue={product.title} />
                                    <p style={{color: '#fc8f00'}}>Descrição: </p>
                                    <textarea defaultValue={product.description} id={`descriptionProductInputEdit-${product._id}`} />
                                </div>
                                <div className={styles.centerProductsArea} style={{width: '15%'}}>
                                    <p style={{color: '#fc8f00'}}>Categoria: </p>
                                    <input type="text" id={`cathegoryProductInputEdit-${product._id}`} style={{fontSize: 'small', marginBottom: '5px'}} defaultValue={product.cathegory} />
                                    <p style={{color: '#fc8f00'}}>Prazo: </p>
                                    <input type="text" id={`termProductInputEdit-${product._id}`} style={{fontSize: 'small'}} defaultValue={product.term} />
                                </div>
                                <div className={styles.centerProductsArea}>
                                    <p style={{color: '#fc8f00'}}>Material: </p>
                                    <input type="text" id={`materialProductInputEdit-${product._id}`} style={{fontSize: 'small', marginBottom: '5px'}} defaultValue={product.material} />
                                    <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
                                        <p style={{color: '#fc8f00'}}>Página Principal: </p>
                                        <input style={{width: '10%'}} type="checkbox" name="onMain" id={`onMainProductInputEdit-${product._id}`} defaultChecked={product.on_main_page ? true : false}/>
                                    </div>
                                </div>
                                <div className={styles.formButtons}>
                                    <div className={styles.submitButton} onClick={() => editProduct(product._id)}><i className="fa-solid fa-pen-to-square"></i></div>
                                    <div className={styles.cancelButton} onClick={() => deleteImage(product._id, publicId)}><i className="fa-solid fa-trash"></i></div>
                                </div>
                            </form>
                        </div>
                    )
                })}
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