import styles from './MainCarousel.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function MainCarousel() {
	const globalHeight = "70vh";

	const images = [
		'https://assets.website-files.com/5c281a6a77f28357629f48ce/5c2e9ed9c370807d384b20e8_banner-sale%20(3).jpg',
		'https://ducamoveis.com.br/wp-content/uploads/2017/11/8-vantagens-dos-moveis-planejados.jpg',
	]

	const CarouselItems = images.map((image, index) => (
		<div key={index} style={{ width: '100%', height: globalHeight }}>
			<img
				style={{ width: '100%', height: globalHeight }}
				src={image}
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