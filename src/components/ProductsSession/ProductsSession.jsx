import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './ProductsSession.module.css'

export default function ProductsSession(){
    const router = useRouter();
    const { page = 1 } = router.query;

    const productsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const productsDivisor = [];
    
    for (let i = 0; i < productsCount.length; i += 9) {
        productsDivisor.push(productsCount.slice(i, i + 9));
    }

    const products = productsDivisor[page-1].map((product, index) => {
        return(
            <div key={index} className={styles.product}>
                <img src="https://assets.website-files.com/5c281a6a77f28357629f48ce/5c2d45ca2d233f5b793ecdff_armchair-1.jpg" alt="Trabalho 1" style={{marginBottom: '10px'}}/>
                <h3 style={{marginLeft: '5px', fontWeight: '600'}}>Trabalho {product}</h3>
            </div>
        )
    })

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