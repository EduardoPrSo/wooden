import styles from './Product.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from 'react';

export default function Product({product}) {
    const [imageZoom, setImageZoom] = useState(false)

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    const renderCustomThumbs = () => {
        const thumbList = product.images.map((image, index) => (
            <div key={index}>
                <img
                    style={windowWidth > 900 ? { height: '8vh', width: 'auto'} : { height: '5vh', width: '8vw'}}
                    src={image}
                />
            </div>
        ))
      
        return(thumbList)
    }

    const renderArrowPrev = (onClickHandler, hasPrev, label) => {
		return(
			<button className={styles.carouselArrow} onClick={onClickHandler} disabled={!hasPrev} aria-label={label} style={{color: 'orange', position: 'absolute', zIndex: '950', top: '45%', left: '2%'}}>
				<i className='fa-solid fa-chevron-left'></i>
			</button>
		)
	}

	const renderArrowNext = (onClickHandler, hasNext, label) => {
		return(
			<button className={styles.carouselArrow} onClick={onClickHandler} disabled={!hasNext} aria-label={label} style={{color: 'orange', position: 'absolute', top: '45%', right: '2%'}}>
				<i className='fa-solid fa-chevron-right'></i>
			</button>
		)
	}

    return (
        <div className={styles.mainContainer}>
            <div className={styles.productContainer}>
                <div className={styles.carouselContainer}>
                    <Carousel className={styles.carouselStyle} 
                        style={{margin: 0}} 
                        showStatus={false} 
                        renderArrowPrev={renderArrowPrev}
                        renderArrowNext={renderArrowNext}
                        autoPlay={false} 
                        showIndicators={false} 
                        showThumbs={windowWidth > 900 ? true : false} 
                        renderThumbs={renderCustomThumbs}
                    >
                        {product && product.images.map((product, index) => (
                            <div key={index} onClick={()=>setImageZoom(windowWidth > 900 && true)} style={{height: '50vh', overflow: 'hidden', borderBottom: windowWidth > 900 ? '1px solid rgba(54, 54, 54, 0.349)' : '0', paddingBottom: '4%'}}>
                                <img
                                    style={{ height: 'auto', width: '100%', margin: 0, borderRadius: '5px', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}
                                    src={product}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className={styles.infoContainer}>
                    {product && <div className={styles.infoContent}>
                        <h1 style={{color: '#fc8f00', marginTop: windowWidth > 900 ? '0' : '20px'}}>{product.title}</h1>
                        <p style={{borderBottom: '2px solid #fc8f00', paddingBottom: '5%', height: windowWidth > 900 ? '50vh' : 'auto', textAlign: 'justify'}}>{product.description}</p>
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
            <div className={styles.imageZoom} style={!imageZoom ? {diplay: 'none'} : {display: 'flex', flexDirection: 'colunm'}}>
                <i className={`fa-solid fa-xmark ${styles.imageZoomCloseButtonIcon}`} onClick={()=>setImageZoom(false)}></i>
                <Carousel className={styles.carouselZoomStyle} 
                    style={{margin: 0}} 
                    showStatus={false} 
                    renderArrowPrev={renderArrowPrev}
                    renderArrowNext={renderArrowNext}
                    autoPlay={false} 
                    showIndicators={false} 
                    renderThumbs={renderCustomThumbs}
                >
                    {product && product.images.map((product, index) => (
                        <div key={index} style={{borderBottom: '1px solid rgba(54, 54, 54, 0.349)', paddingBottom: '2%'}} onClick={()=>setImageZoom(true)}>
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