import styles from './ProductsDisplay.module.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProductsDisplay({ productsData }) {
    const router = useRouter();
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function productRedirect(id){
        router.push(`/produto/${id}`)
    }

    const displayProducts = productsData.map((product, index) => (
        <div key={index} className={styles.productDiv}>
            {windowWidth > 900 ? index % 2 === 0 ? (
                <>
                    <div className={styles.productImage} style={{transform: scrollY > (500+((index*1.1)*(windowHeight/2))) ? "translateX(0)" : "translateX(-200%)", transition: '1s' }}>
                        <div className={styles.imageCarousel}>
                            <img src={product.images[0]} style={{ width: '25vw', height: '70vh', boxShadow: '5px 5px 10px #808080'}} />
                        </div>
                    </div>
                    <div className={styles.productInfo} style={{width: '30vw', height: '55vh', transform: scrollY > (500+((index*1.1)*(windowHeight/2))) ? "translateX(0)" : "translateX(+200%)", transition: '1s'  }}>
                        <h1 style={{marginBottom: '5%'}}>{product.title}</h1>
                        <p style={{marginBottom: '5%', textAlign: 'justify'}}>{product.description}</p>
                        <button className={styles.productButton} onClick={()=>productRedirect(product._id)}>Saiba mais</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.productInfo} style={{width: '30vw', height: '55vh', transform: scrollY > (500+((index*1.1)*(windowHeight/2))) ? "translateX(0)" : "translateX(-200%)", transition: '1s'  }}>
                        <h1 style={{textAlign: 'right', marginBottom: '5%'}}>{product.title}</h1>
                        <p style={{textAlign: 'right', marginBottom: '5%', textAlign: 'justify'}}>{product.description}</p>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
                            <button className={styles.productButton} onClick={()=>productRedirect(product._id)}>Saiba mais</button>
                        </div>
                    </div>
                    <div className={styles.productImage} style={{transform: scrollY > (500+((index*1.1)*(windowHeight/2))) ? "translateX(0)" : "translateX(+200%)", transition: '1s' }}>
                        <div className={styles.imageCarousel}>
                            <img src={product.images[0]} style={{ width: '25vw', height: '70vh', boxShadow: '5px 5px 10px #808080' }} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.productImage}>
                        <div className={styles.imageCarousel}>
                            <img onClick={()=>productRedirect(product._id)} src={product.images[0]} style={{ width: '100%', height: 'auto', boxShadow: '5px 5px 10px #808080' }} />
                        </div>
                        <h2 style={{marginBottom: '5%'}}>{product.title}</h2>
                    </div>
                </>
            )}
        </div>
    ));

    return (
      <div className={styles.mainContainer} style={{with: '100vw', display: 'flex'}}>
            <div className={styles.productsContainer}>
                <div className={styles.productsRow}>
                    <h2 className={styles.mainTitle}>MÓVEIS SOB MEDIDA</h2>
                    {displayProducts}
                </div>
            </div>
      </div>
  )
}
