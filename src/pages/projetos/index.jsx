import styles from './Works.module.css';
import Header from "@/components/Header/Header";
import ProductsSession from "@/components/ProductsSession/ProductsSession";
import Projects from '@/components/Projects/Projects';
import Footer from "@/components/Footer/Footer";
import { fetchAPI} from "@/lib/fetchAPI";

export default function Trabalhos({products}){
    return(
        <div className={styles.mainWorks}>
            <Header />
            <Projects productsData={products} />
            {/* <ProductsSession productsData={products} /> */}
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