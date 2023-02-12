import Header from "@/components/Header/Header";
import ProductsSession from "@/components/ProductsSession/ProductsSession";
import Footer from "@/components/Footer/Footer";
import { fetchAPI} from "@/lib/fetchAPI";

export default function Trabalhos({products}){
    return(
        <div>
            <Header />
            <ProductsSession productsData={products} />
            <Footer />
        </div>
    )
}

export const getServerSideProps = async () => {
    const products = await fetchAPI('api/products/getAllProducts');

    return {
        props: {
            products
        }
    }
}