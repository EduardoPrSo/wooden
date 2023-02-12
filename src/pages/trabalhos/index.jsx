import Header from "@/components/Header/Header";
import ProductsSession from "@/components/ProductsSession/ProductsSession";
import Footer from "@/components/Footer/Footer";

import axios from 'axios'

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
    const response = await axios.get('http://localhost:3000/api/products/getAllProducts');
    const products = response.data;

    return {
        props: {
            products
        }
    }
}