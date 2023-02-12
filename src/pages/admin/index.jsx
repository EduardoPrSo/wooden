import Header from '@/components/Header/Header'
import AdminPage from '@/components/AdminPage/AdminPage'
import { parseCookies } from 'nookies';
import { fetchAPI } from '@/lib/fetchAPI';

export default function Admin({carouselImages, products}) {
    return (
        <>
            <Header />
            {<AdminPage items={{carouselImages, products}}/>}
        </>
    )
}

export const getServerSideProps = async (context) => {
    const isAdmin = parseCookies(context).IS_LOGGED_WOODEN_ADMIN || false;

    if (!isAdmin) {
        return {redirect: {destination: '/admin/signin', permanent: false}}
    }

    const carouselImages = await fetchAPI('api/carouselImages/getCarouselImages');

    const products = await fetchAPI('api/products/getAllProducts');

    return {
        props: {
            carouselImages,
            products,
            isAdmin
        }
    }
}