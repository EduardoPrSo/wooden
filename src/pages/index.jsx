import Header from '@/components/Header/Header'
import MainCarousel from '@/components/MainCarousel/MainCarousel'
import ProductsDisplay from '@/components/ProductsDisplay/ProductsDisplay'
import Partners from '@/components/Partners/Partners'
import Footer from '@/components/Footer/Footer'

export default function Home() {
    return (
        <>
            <Header />
            <MainCarousel />
            <ProductsDisplay />
            <Partners />
            <Footer />
        </>
    )
}
