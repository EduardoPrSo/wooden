import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import styles from './ProductsSession.module.css'

export default function ProductsSession({productsData}){
    const router = useRouter();
    const { page = 1 } = router.query;

    const productsDivisor = [];
    
    for (let i = 0; i < productsData.length; i += 9) {
        productsDivisor.push(productsData.slice(i, i + 9));
    }

    const products = productsDivisor[page-1].map((product, index) => {
        return(
            <div key={index} className={styles.product} onClick={()=>productRedirect(product._id)}>
                <div className={styles.imageContainer}>
                    <img src={product.images[0]} 
                />
                </div>
                <h3 style={{marginLeft: '10px', fontWeight: '600', fontSize: '1rem'}}>{product.title}</h3>
            </div>
        )
    })

    function productRedirect(id){
        router.push(`/produto/${id}`)
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
        <div className={styles.mainContainer}>
            <div className={styles.productsContainer}>
                <div className={styles.productsDisplay}>
                    {products}
                </div>
                <div className={styles.pageButtons}>
                    <PageButtons productsDivisor={productsDivisor} page={page} styles={styles} />
                </div>
            </div>
        </div>
    )
}