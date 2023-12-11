import styles from './ProductsDisplay.module.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProductsDisplay({ productsData }) {
    const router = useRouter();
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [scrollComplete, setScrollComplete] = useState(false)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            if (window.scrollY >= (500+((productsData.length*1.1)*(window.innerHeight/2)))) {
                setScrollComplete(true)
            }
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
                    <div className={styles.productImage} style={scrollComplete == false ? {transform: scrollY > (500+((index*1.1)*(windowHeight/2))) ? "translateX(0)" : "translateX(-200%)", transition: '1s' } : {transform: "translateX(0)", transition: '1s'}}>
                        <div className={styles.imageCarousel}>
                            <img src={product.images[0]} style={{ width: '100%', height: '70vh', boxShadow: '5px 5px 10px #808080'}} />
                            <div className={styles.imageDecoration}>
                                <h1 className={styles.decorationTitle}>{product.title}</h1>
                                <img className={styles.decorationLogo} src="/images/wow.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.productInfo} style={scrollComplete == false ? {width: '30vw', height: '55vh', transform: scrollY > (500+((index*1.1)*(windowHeight/2))) ? "translateX(0)" : "translateX(+200%)", transition: '1s'  } : {width: '30vw', height: '55vh', transform: "translateX(0)", transition: '1s'  }}>
                        <h1 style={{marginBottom: '5%'}}>{product.title}</h1>
                        <p style={{marginBottom: '5%', textAlign: 'justify'}}>{product.description}</p>
                        <button className={styles.productButton} onClick={()=>productRedirect(product._id)}>Saiba mais</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.productInfo} style={scrollComplete == false ? {width: '30vw', height: '55vh', transform: scrollY > (500+((index*1.1)*(windowHeight/2))) ? "translateX(0)" : "translateX(-200%)", transition: '1s'  } : {width: '30vw', height: '55vh', transform: "translateX(0)", transition: '1s'  }}>
                        <h1 style={{textAlign: 'right', marginBottom: '5%'}}>{product.title}</h1>
                        <p style={{textAlign: 'right', marginBottom: '5%', textAlign: 'justify'}}>{product.description}</p>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
                            <button className={styles.productButton} onClick={()=>productRedirect(product._id)}>Saiba mais</button>
                        </div>
                    </div>
                    <div className={styles.productImage} style={scrollComplete == false ? {transform: scrollY > (500+((index*1.1)*(windowHeight/2))) ? "translateX(0)" : "translateX(+200%)", transition: '1s' } : {transform: "translateX(0)", transition: '1s'}}>
                        <div className={styles.imageCarousel}>
                            <img src={product.images[0]} style={{ width: '100%', height: '70vh', boxShadow: '5px 5px 10px #808080' }} />
                            <div className={styles.imageDecoration}>
                                <h1 className={styles.decorationTitle}>{product.title}</h1>
                                <img className={styles.decorationLogo} src="/images/wow.png" alt="" />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.productImage}>
                        <div className={styles.imageCarousel} onClick={()=>productRedirect(product._id)}>
                            <img src={product.images[0]} style={{ width: '100%', height: '40vh', boxShadow: '5px 5px 10px #808080' }} />
                            <div className={styles.imageDecoration}>
                                <h1 className={styles.decorationTitle}>{product.title}</h1>
                                <img className={styles.decorationLogo} src="/images/wow.png" alt="" />
                            </div>
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
                    <h2 className={styles.mainTitle}>MÓVEIS SOB MEDIDA</h2>
                    {displayProducts}
                </div>
            </div>
      </div>
  )
}
