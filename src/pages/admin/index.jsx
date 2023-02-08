import Header from '@/components/Header/Header'
import AdminPage from '@/components/AdminPage/AdminPage'
import Footer from '@/components/Footer/Footer'

import axios from 'axios'

export default function Admin({carouselImages}) {
    return (
        <>
            <Header />
            <AdminPage images={carouselImages}/>
            {/* <Footer /> */}
        </>
    )
}

export const getServerSideProps = async () => {
    const response = await axios.get('http://localhost:3000/api/carousel_images/getCarouselImages' || 'https://woodenmarcenaria.com.br/api/carousel_images/getCarouselImages');
    const carouselImages = response.data;

    return {
        props: {
            carouselImages
        }
    }
}