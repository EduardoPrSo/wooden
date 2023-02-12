import Header from '@/components/Header/Header'
import MainCarousel from '@/components/MainCarousel/MainCarousel'
import ProductsDisplay from '@/components/ProductsDisplay/ProductsDisplay'
import Partners from '@/components/Partners/Partners'
import Footer from '@/components/Footer/Footer'
import { api } from '@/lib/axios';
import axios from 'axios';

export default function Home({carouselImages, products}) {
    return (
        <>
            <Header />
            <MainCarousel carouselImages={carouselImages}/>
            <ProductsDisplay productsData={products} />
            <Partners />
            <Footer />
        </>
    )
}

export const getServerSideProps = async () => {
    const responseCarousel = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carouselImages/getCarouselImages`);
    const carouselImages = responseCarousel.data;

    const responseProducts = await api.get('/api/products/getMainPageProducts');
    const products = responseProducts.data;

    return {
        props: {
            carouselImages,
            products,
        }
    }
}