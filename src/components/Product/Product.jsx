import styles from './Product.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from 'react';

export default function Product({product}) {
    const [imageZoom, setImageZoom] = useState(false)

    const renderCustomThumbs = () => {
        const thumbList = product.images.map((image, index) => (
            <div key={index} style={{display: 'flex', justifyContent: 'center'}}>
                <img
                    style={{ height: '10vh', width: 'auto'}}
                    src={image}
                />
            </div>
        ))
      
        return(thumbList)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.productContainer}>
                <div className={styles.carouselContainer}>
                    <Carousel className={styles.carouselStyle} style={{margin: 0}} showStatus={false} showArrows={false} autoPlay={false} showIndicators={false} renderThumbs={renderCustomThumbs}>
                        {product && product.images.map((product, index) => (
                            <div key={index} onClick={()=>setImageZoom(true)} style={{overflow: 'hidden'}}>
                                <img
                                    style={{ height: '50vh', width: 'auto', margin: 0}}
                                    src={product}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className={styles.infoContainer}>
                    {product && <div className={styles.infoContent}>
                        <h1 style={{color: '#fc8f00'}}>{product.title}</h1>
                        <p style={{borderBottom: '2px solid #fc8f00', paddingBottom: '5%', height: '50vh'}}>{product.description}</p>
                        <div className={styles.moreInfo}>
                            <div className={styles.productInfo}>
                                <h3 style={{marginBottom: '5%', color: '#fc8f00'}}>Categoria</h3>
                                <p>{product.cathegory}</p>
                            </div>
                            <div className={styles.productInfo}>
                                <h3 style={{marginBottom: '5%', color: '#fc8f00'}}>Prazo</h3>
                                <p>{product.term}</p>
                            </div>
                            <div className={styles.productInfo}>
                                <h3 style={{marginBottom: '5%', color: '#fc8f00'}}>Material</h3>
                                <p>{product.material}</p>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <div className={styles.imageZoom} style={!imageZoom ?{diplay: 'none'} : {display: 'flex', flexDirection: 'colunm'}}>
                <i className={`fa-solid fa-xmark ${styles.imageZoomCloseButtonIcon}`} onClick={()=>setImageZoom(false)}></i>
                <Carousel className={styles.carouselZoomStyle} style={{margin: 0}} showStatus={false} showArrows={false} autoPlay={false} showIndicators={false} renderThumbs={renderCustomThumbs}>
                    {product && product.images.map((product, index) => (
                        <div key={index} onClick={()=>setImageZoom(true)}>
                            <img
                                style={{ height: '60vh', width: 'auto', margin: 0}}
                                src={product}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}