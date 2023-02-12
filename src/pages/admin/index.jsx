import Header from '@/components/Header/Header'
import AdminPage from '@/components/AdminPage/AdminPage'
import AdminLogin from '@/components/AdminLogin/AdminLogin'
import { setCookie, parseCookies } from 'nookies';
import { useState } from 'react';
import { api } from '@/lib/axios';

export default function Admin({carouselImages, products, logged}) {
    const [isLogged, setIsLogged] = useState(logged);

    !logged && setLoggedCookie(true);

    function setLoggedCookie(value) {
        setCookie(null, 'IS_LOGGED_WOODEN_ADMIN', value, {
            path: '/',
            maxAge: 86400
        })
    }

    const handleLogin = () => {
        setLoggedCookie(true);
        setIsLogged(true);
    }

    return (
        <>
            <Header />
            {isLogged ? <AdminPage items={{carouselImages, products}}/> : <AdminLogin onLogin={handleLogin}/>}
        </>
    )
}

export const getServerSideProps = async (context) => {
    const logged = parseCookies(context).IS_LOGGED_WOODEN_ADMIN || false;

    const responseCarousel = await api.get('/api/carouselImages/getCarouselImages');
    const carouselImages = responseCarousel.data;

    const responseProducts = await api.get('/api/products/getAllProducts');
    const products = responseProducts.data;

    return {
        props: {
            carouselImages,
            products,
            logged
        }
    }
}