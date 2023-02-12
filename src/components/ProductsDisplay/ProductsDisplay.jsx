import styles from './ProductsDisplay.module.css'
import { useRouter } from 'next/router';

export default function ProductsDisplay({ productsData }) {
    const router = useRouter();

    function productRedirect(id){
        router.push(`/produto/${id}`)
    }

    const displayProducts = productsData.map((product, index) => (
        <div key={index} className={styles.productDiv}>
            {index % 2 === 0 ? (
                <>
                    <div className={styles.productImage}>
                        <div className={styles.imageCarousel}>
                            <img src={product.images[0]} style={{ width: '25vw', height: '70vh', boxShadow: '5px 5px 10px #808080' }} />
                        </div>
                    </div>
                    <div className={styles.productInfo} style={{width: '30vw', height: '55vh', marginTop: '10%' }}>
                        <h1 style={{marginBottom: '5%'}}>{product.title}</h1>
                        <p style={{marginBottom: '5%', textAlign: 'justify'}}>{product.description}</p>
                        <button className={styles.productButton} onClick={()=>productRedirect(product._id)}>Ver mais</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.productInfo} style={{ width: '30vw', height: '55vh', marginTop: '10%' }}>
                        <h1 style={{textAlign: 'right', marginBottom: '5%'}}>{product.title}</h1>
                        <p style={{textAlign: 'right', marginBottom: '5%', textAlign: 'justify'}}>{product.description}</p>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
                            <button className={styles.productButton} onClick={()=>productRedirect(product._id)}>Ver mais</button>
                        </div>
                    </div>
                    <div className={styles.productImage}>
                        <div className={styles.imageCarousel}>
                            <img src={product.images[0]} style={{ width: '25vw', height: '70vh', boxShadow: '5px 5px 10px #808080' }} />
                        </div>
                    </div>
                </>
            )}
        </div>
    ));

    return (
      <div className={styles.mainContainer} style={{with: '100vw', display: 'flex'}}>
            <div className={styles.productsContainer}>
                <div className={styles.productsRow}>
                    {displayProducts}
                </div>
            </div>
      </div>
  )
}