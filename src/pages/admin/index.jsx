import Header from '@/components/Header/Header'
import AdminPage from '@/components/AdminPage/AdminPage'
import Footer from '@/components/Footer/Footer'

import axios from 'axios'

export default function Admin({carouselImages, products}) {
    return (
        <>
            <Header />
            <AdminPage items={{carouselImages, products}}/>
            {/* <Footer /> */}
        </>
    )
}

export const getServerSideProps = async () => {
    const responseCarousel = await axios.get('http://localhost:3000/api/carousel_images/getCarouselImages');
    const carouselImages = responseCarousel.data;

    const responseProducts = await axios.get('http://localhost:3000/api/products/getAllProducts');
    const products = responseProducts.data;

    return {
        props: {
            carouselImages,
            products
        }
    }
}