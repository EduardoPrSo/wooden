import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Projects.module.css'
import Product from '../Product/Product.jsx';
import { fetchAPI } from '@/lib/fetchAPI';

export default function Projects({productsData}){
    const [windowWidth, setWindowWidth] = useState(0);
    const [showProduct, setShowProduct] = useState(false);
    const [showProductID, setShowProductID] = useState();

    const router = useRouter();
    const { page } = router.query;

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    const productsDivisor = [];
    
    const nProduts = windowWidth > 900 ? 9 : 4;

    for (let i = 0; i < productsData.length; i += nProduts) {
       productsDivisor.push(productsData.slice(i, i + nProduts));
    }

    const products = productsDivisor.length > 0 ? productsDivisor[page-1].map((product, index) => {
        return(
            <div key={index} className={styles.product} onClick={()=>productRedirect(product._id)}>
                <img className={styles.mainImage} src={product.images[0]} />
                <div className={styles.imageDecoration}>
                    <h1 className={styles.decorationTitle}>{product.title}</h1>
                    <img className={styles.decorationLogo} src="/images/wow.png" alt="" />
                </div>
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
                <div className={styles.buttonContainer}>
                    <Link href={`/projetos?page=${parseInt(page) + 1}`} style={{textDecoration: 'none'}}>
                        <button className={styles.productButton}>
                            Próxima  
                            <i className="fa-sharp fa-solid fa-chevron-right"></i>
                        </button>
                    </Link>
                </div>
            );
        }else if (page > 1 && page < productsDivisor.length) {
            console.log(page)
            return (
                <div className={styles.buttonContainer}>
                    <Link href={`/projetos?page=${parseInt(page) - 1}`} style={{textDecoration: 'none'}}>
                        <button className={styles.productButton} style={{marginRight: '15px'}}>
                            <i className="fa-sharp fa-solid fa-chevron-left"></i>
                            Anterior  
                        </button>
                    </Link>
                    <Link href={`/projetos?page=${parseInt(page) + 1}`} style={{textDecoration: 'none'}}>
                        <button className={styles.productButton}>
                            Próxima  
                            <i className="fa-sharp fa-solid fa-chevron-right"></i>
                        </button>
                    </Link>
                </div>
            );
        } else if (productsDivisor.length > 1 && page == productsDivisor.length){
            return (
                <div className={styles.buttonContainer}>
                    <Link href={`/projetos?page=${parseInt(page) - 1}`} style={{textDecoration: 'none'}}>
                        <button className={styles.productButton}>
                            <i className="fa-sharp fa-solid fa-chevron-left"></i>
                            Anterior  
                        </button>
                    </Link>
                </div>
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
                <h2 className={styles.mainTitle}>TODOS OS PROJETOS</h2>
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