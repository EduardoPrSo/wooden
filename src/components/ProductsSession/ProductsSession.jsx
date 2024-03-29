import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ProductsSession.module.css'
import Product from '../Product/Product.jsx';
import { fetchAPI } from '@/lib/fetchAPI';

export default function ProductsSession({productsData}){
    const [windowWidth, setWindowWidth] = useState(0);
    const [showProduct, setShowProduct] = useState(false);
    const [showProductID, setShowProductID] = useState();

    const router = useRouter();
    const { page = 1 } = router.query;

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    const productsDivisor = [];
    
    const nProduts = windowWidth > 900 ? 9 : 6;

    for (let i = 0; i < productsData.length; i += nProduts) {
       productsDivisor.push(productsData.slice(i, i + nProduts));
    }

    const products = productsDivisor.length > 0 ? productsDivisor[page-1].map((product, index) => {
        return(
            <div key={index} className={styles.product} onClick={()=>productRedirect(product._id)}>
                <div className={styles.imageContainer}>
                    <img src={product.images[0]} 
                />
                </div>
                <h3 style={{marginLeft: '10px', fontWeight: '600', fontSize: '1rem'}}>{product.title}</h3>
            </div>
        )
    }) : null;

    async function productRedirect(id){
        if (windowWidth > 900){
            setShowProduct(true);
            const product = await fetchAPI('api/products/getProduct',{
                id: id
            });
            setShowProductID(product);
        } else {
            router.push(`/produto/${id}`)
        }
    }

    const PageButtons = ({ productsDivisor, page, styles }) => {
        if (productsDivisor.length > 1 && page == 1) {
            return (
                <Link href={`/trabalhos?page=${parseInt(page) + 1}`} style={{textDecoration: 'none'}}>
                    <button className={styles.productButton}>
                        Próxima  
                        <i className="fa-sharp fa-solid fa-chevron-right"></i>
                    </button>
                </Link>
            );
        }else if (page > 1 && page < productsDivisor.length) {
            return (
                <>
                    <Link href={`/trabalhos?page=${parseInt(page) - 1}`} style={{textDecoration: 'none'}}>
                        <button className={styles.productButton} style={{marginRight: '15px'}}>
                            <i className="fa-sharp fa-solid fa-chevron-left"></i>
                            Anterior  
                        </button>
                    </Link>
                    <Link href={`/trabalhos?page=${parseInt(page) + 1}`} style={{textDecoration: 'none'}}>
                        <button className={styles.productButton}>
                            Próxima  
                            <i className="fa-sharp fa-solid fa-chevron-right"></i>
                        </button>
                    </Link>
                </>
            );
        } else if (productsDivisor.length > 1 && page == productsDivisor.length){
            return (
                <Link href={`/trabalhos?page=${parseInt(page) - 1}`} style={{textDecoration: 'none'}}>
                    <button className={styles.productButton}>
                        <i className="fa-sharp fa-solid fa-chevron-left"></i>
                        Anterior  
                    </button>
                </Link>
            );
        }
    };

    return(
        <>
            <div className={styles.productContainerBackground} style={showProduct ? {transform: 'scale(1)', backgroundColor: 'rgba(0, 0, 0, 0.425)'} : {transform: 'scale(0)', transition: 'transform .7s', backgroundColor: 'transparent'}}>
                <div className={styles.productContainer} style={showProduct ? {transform: 'scale(1)', transition: 'transform .5s'} : {transform: 'scale(0)', transition: 'transform .5s'}}>
                    <i className={`fa-solid fa-xmark ${styles.showProductCloseButtonIcon}`} onClick={()=>{setShowProduct(false);setShowProductID();}}></i>
                    <Product product={showProduct && showProductID}/>
                </div>
            </div>
            <div className={styles.mainContainer} style={showProduct ? {filter: 'blur(5px)'} : {}}>
                <h2 className={styles.mainTitle}>TODOS OS TRABALHOS</h2>
                <div className={styles.productsContainer}>
                    <div className={styles.productsDisplay}>
                        {products}
                    </div>
                    <div className={styles.pageButtons}>
                        <PageButtons productsDivisor={productsDivisor} page={page} styles={styles} />
                    </div>
                </div>
            </div>
        </>
    )
}