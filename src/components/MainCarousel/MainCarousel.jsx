import styles from './MainCarousel.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function MainCarousel({carouselImages}) {
	const globalHeight = "70vh";

	const CarouselItems = carouselImages.map((image, index) => (
		<div key={index} className={styles.carouselImageDiv}>
			<img
				className={styles.carouselImage}
				src={image.url}
			/>
		</div>
	));

    return (
		<div className={styles.carouselContainer}>
			<Carousel className={styles.carouselStyle} showThumbs={false} showStatus={false}>
				{CarouselItems}
			</Carousel>
		</div>
	)
}