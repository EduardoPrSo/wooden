import Header from "@/components/Header/Header";
import Product from "@/components/Product/Product";
import Footer from "@/components/Footer/Footer";

import { fetchAPI} from "@/lib/fetchAPI";

export default function Trabalhos({product}){

    return(
        <div>
            <Header />
            <Product product={product}/>
            <Footer />
        </div>
    )
}

export const getServerSideProps = async ({ query }) => {
    const { id } = query;

    const product = await fetchAPI('api/products/getProduct',{
        id: id
    });

    return {
        props: {
            product
        }
    }
}