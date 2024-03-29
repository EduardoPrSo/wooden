import styles from './MainCarousel.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'next/image';

export default function MainCarousel({carouselImages}) {
	const CarouselItems = carouselImages.map((image, index) => (
		<div key={index} className={styles.carouselImageDiv}>
			<img
				className={styles.carouselImage}
				src={image.url}
			/>
		</div>
	));

	const renderArrowPrev = (onClickHandler, hasPrev, label) => {
		return(
			<button className={styles.carouselArrowPrev} onClick={onClickHandler} disabled={!hasPrev} aria-label={label} style={{color: 'orange', position: 'absolute', zIndex: '950', left: '2%'}}>
				<i className='fa-solid fa-chevron-left'></i>
			</button>
		)
	}

	const renderArrowNext = (onClickHandler, hasNext, label) => {
		return(
			<button className={styles.carouselArrowNext} onClick={onClickHandler} disabled={!hasNext} aria-label={label} style={{color: 'orange', position: 'absolute', right: '2%'}}>
				<i className='fa-solid fa-chevron-right'></i>
			</button>
		)
	}

    return (
		<div className={styles.carouselContainer}>
			<Carousel 
				className={styles.carouselStyle} 
				showIndicators={false} 
				showThumbs={false} 
				showStatus={false} 
				autoPlay={true} 
				infiniteLoop={true} 
				interval={5000} 
				renderArrowPrev={renderArrowPrev} 
				renderArrowNext={renderArrowNext}
			>
				{CarouselItems}
			</Carousel>
		</div>
	)
}