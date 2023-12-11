import Header from '@/components/Header/Header'
import MainCarousel from '@/components/MainCarousel/MainCarousel'
import ProductsDisplay from '@/components/ProductsDisplay/ProductsDisplay'
import Partners from '@/components/Partners/Partners'
import StoreBanner from '@/components/StoreBanner/StoreBanner'
import Budget from '@/components/Budget/Budget'
import { fetchAPI } from '@/lib/fetchAPI';

export default function Home({carouselImages, products}) {
    return (
        <>
            <Header />
            <MainCarousel carouselImages={carouselImages}/>
            <ProductsDisplay productsData={products} />
            {/* <StoreBanner /> */}
            {/* <Partners /> */}
            <Budget />
        </>
    )
}

export const getServerSideProps = async () => {
    const [carouselImages, products] = await Promise.all([
        fetchAPI(`api/carouselImages/getCarouselImages`), 
        fetchAPI('api/products/getMainPageProducts')
    ]);

    return {
        props: {
            carouselImages,
            products,
        }
    }
}
